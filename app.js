function recursiveFunction(n) {
  if (n === 0) throw new Error("Recursion error at base case");
  debugger
  recursiveFunction(n - 1);
}
recursiveFunction(10)
