module.exports = (persistence = {}) => {
  const findByEmail = async (email) => {
    return await new Promise((resolve) => resolve(persistence[email]));
  };

  const setByEmail = async (email, amount) =>
    new Promise((resolve) => {
      if (!persistence[email]) {
        const maxFirstAmount = 50;
        if (amount > maxFirstAmount) {
          const error = new Error("First amount exceeded");
          error.code = 101;
          throw error;
        } else {
          persistence[email] = amount;
          resolve(persistence[email]);
        }
      } else {
        const maxPossibleAmount = 1000 - persistence[email];
        if (amount > maxPossibleAmount) {
          const error = new Error("Amount exceeded");
          error.code = 100;
          throw error;
        } else {
          persistence[email] = persistence[email] + amount;
          resolve(persistence[email]);
        }
      }
    });

  return {
    findByEmail,
    setByEmail,
  };
};
