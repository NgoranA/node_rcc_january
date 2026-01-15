import EventEmitter from 'node:events';
import os from "node:os";

class HealthMonitor extends EventEmitter {
  constructor() {
    super();
    this.cpuUsage = 0
  }

  // simulate CPU usage update
  updateCpuUsage(usage) {
    this.cpuUsage = usage;
    if (this.cpuUsage > 80) {
      this.emit('overload', { cpuUsage: this.cpuUsage });
    }
  }
}

const monitor = new HealthMonitor();

monitor.on('overload', (data) => {
  console.log(`CPU Overload detected! Current usage: ${data.cpuUsage}%`);
})

// simulate CPU usage changes

setInterval(() => {
  // const usage = Math.floor(Math.random() * 100);
  const usage = os.loadavg()[0] / os.cpus().length * 100;
  console.log(`Current CPU usage: ${usage}%`);
  monitor.updateCpuUsage(usage);
}, 1000);
