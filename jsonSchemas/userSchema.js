let userSchema = {
    type: "object",
  
    properties: {
      firstName: { type: "string", minLength: 1 },
      lastName: { type: "string", minLength: 1 },
      email: { type: "string", minLength: 1 },
    },
    required: ["firstName", "lastName", "email"],
  };

module.exports = userSchema;