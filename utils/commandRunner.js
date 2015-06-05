'use strict';

module.exports = function (authenticationService, contextFactory, contextHolder, loginPrompt, messages, workspaceRepository) {
  return {
    run: run
  };

  function run(command, args) {
    contextHolder.set(contextFactory.create());

    return validateSetup(command)
      .then(function () {
        return command.validateInput(args);
      })
      // TODO: users must be able to login in a non-interactive way.
      .then(loginPrompt.getUserCredentials)
      .then(function (user) {
        return authenticationService.login(user.name, user.password);
      })
      .then(function (authentication) {
        contextHolder.set(contextFactory.create(authentication));
        return command.execute(args);
      });
  }

  function validateSetup(command) {
    if (command.noSetupNeeded) {
      return Promise.resolve();
    } else {
      var workspace = workspaceRepository.get();
      if (workspace.subOrg && workspace.api && workspace.apiVersion) {
        return Promise.resolve();
      } else {
        return Promise.reject(messages.setupNeeded());
      }
    }
  }
};