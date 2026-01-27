import express from 'express';
import { STATUS_CODES } from "node:http";

import db from '../config/db.js';

const router = express.Router();

// Middleware to validate Content-Type for POST/PUT/PATCH
const validateContentType = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && !req.is('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }
  next();
};

router.use(validateContentType);

// Input validation helper
const validateBicycleData = (data, isPartial = false) => {
  const errors = [];

  if (!isPartial && !data.brand) {
    errors.push('brand is required');
  }
  if (!isPartial && !data.color) {
    errors.push('color is required');
  }

  if (data.brand !== undefined && (typeof data.brand !== 'string' || data.brand.trim() === '')) {
    errors.push('brand must be a non-empty string');
  }
  if (data.color !== undefined && (typeof data.color !== 'string' || data.color.trim() === '')) {
    errors.push('color must be a non-empty string');
  }

  return errors;
};

/* GET bicycle listing. */
router.get('/', async function (req, res, next) {
  try {
    const { limit = 5, offset = 0, brand, color } = req.query;

    let query = "SELECT * FROM bicycles";
    const params = [];
    const conditions = [];

    if (brand) {
      conditions.push("brand = ?");
      params.push(brand);
    }
    if (color) {
      conditions.push("color = ?");
      params.push(color);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const result = db.prepare(query).all(...params);

    // Add HATEOAS links
    const bicycles = result.map(bicycle => ({
      ...bicycle,
      _links: {
        self: { href: `/bicycles/${bicycle.id}` },
        collection: { href: '/bicycles' }
      }
    }));

    res.json({
      data: bicycles,
      _links: {
        self: { href: `/bicycles?limit=${limit}&offset=${offset}` }
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;

  try {
    const result = db.prepare("SELECT * FROM bicycles WHERE id = ?").get(id);
    if (!result) {
      let error = new Error(STATUS_CODES[404]);
      error.status = 404;
      throw error;
    }

    // Add HATEOAS links
    const bicycle = {
      ...result,
      _links: {
        self: { href: `/bicycles/${result.id}` },
        collection: { href: '/bicycles' }
      }
    };

    res.json(bicycle);
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { brand, color } = req.body;

  // Validate input
  const errors = validateBicycleData({ brand, color });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const stmt = db.prepare("INSERT INTO bicycles (brand, color) VALUES (?, ?)");
    const info = stmt.run(brand.trim(), color.trim());

    // Fetch the created resource
    const createdBicycle = db.prepare("SELECT * FROM bicycles WHERE id = ?").get(info.lastInsertRowid);

    // Add HATEOAS links
    const bicycle = {
      ...createdBicycle,
      _links: {
        self: { href: `/bicycles/${createdBicycle.id}` },
        collection: { href: '/bicycles' }
      }
    };

    // Set Location header
    res.location(`/bicycles/${createdBicycle.id}`);
    res.status(201).json(bicycle);
  } catch (error) {
    next(error);
  }
})

router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  const { brand, color } = req.body;

  // Validate input
  const errors = validateBicycleData({ brand, color });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const stmt = db.prepare("UPDATE bicycles SET brand = ?, color = ? WHERE id = ?");
    const info = stmt.run(brand.trim(), color.trim(), id);
    if (info.changes === 0) {
      let error = new Error(STATUS_CODES[404]);
      error.status = 404;
      throw error;
    }

    // Fetch the updated resource
    const updatedBicycle = db.prepare("SELECT * FROM bicycles WHERE id = ?").get(id);

    // Add HATEOAS links
    const bicycle = {
      ...updatedBicycle,
      _links: {
        self: { href: `/bicycles/${updatedBicycle.id}` },
        collection: { href: '/bicycles' }
      }
    };

    res.json(bicycle);
  } catch (error) {
    next(error);
  }
})

router.patch("/:id", async function (req, res, next) {
  const id = req.params.id;
  const { brand, color } = req.body;

  // Validate input (partial update allowed)
  const errors = validateBicycleData({ brand, color }, true);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Check if at least one field is provided
  if (brand === undefined && color === undefined) {
    return res.status(400).json({ errors: ['At least one field (brand or color) must be provided'] });
  }

  try {
    // First check if the bicycle exists
    const existing = db.prepare("SELECT * FROM bicycles WHERE id = ?").get(id);
    if (!existing) {
      let error = new Error(STATUS_CODES[404]);
      error.status = 404;
      throw error;
    }

    // Build dynamic update query
    const updates = [];
    const params = [];

    if (brand !== undefined) {
      updates.push("brand = ?");
      params.push(brand.trim());
    }
    if (color !== undefined) {
      updates.push("color = ?");
      params.push(color.trim());
    }

    params.push(id);

    const query = `UPDATE bicycles SET ${updates.join(", ")} WHERE id = ?`;
    const stmt = db.prepare(query);
    stmt.run(...params);

    // Fetch the updated resource
    const updatedBicycle = db.prepare("SELECT * FROM bicycles WHERE id = ?").get(id);

    // Add HATEOAS links
    const bicycle = {
      ...updatedBicycle,
      _links: {
        self: { href: `/bicycles/${updatedBicycle.id}` },
        collection: { href: '/bicycles' }
      }
    };

    res.json(bicycle);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const stmt = db.prepare("DELETE FROM bicycles WHERE id = ?");
    const info = stmt.run(id);
    if (info.changes === 0) {
      let error = new Error(STATUS_CODES[404]);
      error.status = 404;
      throw error;
    }
    res.status(204).send("Item deleted successfuly");
  } catch (error) {
    next(error);
  }
})



export default router
