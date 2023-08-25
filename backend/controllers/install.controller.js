const installService = require("../services/install.service");

async function install(req, res, next) {
  try {
    // Call the install service to create the database tables
    const installMessage = await installService.installs();

    // Check if the install was successful or not and send the appropriate message to the client
    if (installMessage.status === 200) {
      // Return a successful response with the installation message
      return res.status(200).json({ message: installMessage });
    } else {
      // If the installation message is falsy, consider it as an error
      throw new Error("Installation failed");
    }
  } catch (error) {
    // Handle errors that occur during installation or response sending
    console.error("Installation error:", error);
    return res.status(500).json({ message: installMessage });
  }
}

module.exports = {
  install,
};
