# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0](https://github.com/stayradiated/turbine/compare/v2.2.0...v3.0.0) (2020-01-28)


### Features

* **turbine-driver-google-cloud-pubsub:** support ackDeadlineSeconds ([75a025a](https://github.com/stayradiated/turbine/commit/75a025a21f3ea39648e39b503d827b5369a085f9))


### BREAKING CHANGES

* **turbine-driver-google-cloud-pubsub:** turbine has renamed `events` to `subscriptionHandlers`
and replaces the [type, handlerFn] tuple with the object {type, handlerFn}.





# [2.2.0](https://github.com/stayradiated/turbine/compare/v2.1.0...v2.2.0) (2020-01-26)


### Features

* **turbine-driver-google-cloud-pubsub:** only modify subscription if needed ([eadb7a6](https://github.com/stayradiated/turbine/commit/eadb7a64f94ca666cdbd605c61776f31c609396c))





# [2.1.0](https://github.com/stayradiated/turbine/compare/v2.0.0...v2.1.0) (2020-01-26)


### Features

* **turbine-driver-google-cloud-pubsub:** work around for setting oidcToken ([02e9a17](https://github.com/stayradiated/turbine/commit/02e9a17d2d8a90dfa9c0327942e0921d3b1ceda5))