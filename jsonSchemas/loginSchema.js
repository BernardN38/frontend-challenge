let loginSchema = {
  type: "object",

  properties: {
    password: { type: "string", minLength: 1 },

    email: { type: "string", minLength: 1 },
  },
  required: ["password", "email"],
};

module.exports = loginSchema;
