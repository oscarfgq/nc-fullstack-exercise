module.exports = (persistence = {}) => {
  const findByEmail = async (email) => {
    return await new Promise((resolve) => resolve(persistence[email]));
  };

  const setByEmail = async (email, amount) =>
    new Promise((resolve) => {
      if (!persistence[email]) {
        if (amount > 50) resolve({ error: 101 });
        else persistence[email] = amount;
      } else {
        if (persistence[email] + amount > 1000) resolve({ error: 100 });
        else persistence[email] += amount;
      }
      resolve(amount);
    });

  const payByEmail = async (email, amount) =>
    new Promise((resolve) => {
      if (!persistence[email]) resolve({ error: 101 });
      else if (amount > persistence[email]) resolve({ error: 100 });
      else persistence[email] -= amount;
      resolve(amount);
    });

  return {
    findByEmail,
    setByEmail,
    payByEmail,
  };
};
