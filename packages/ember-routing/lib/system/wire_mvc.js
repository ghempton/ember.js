/**
@module ember
@submodule ember-routing
*/

require("ember-routing/system/controller_for");

var get = Ember.get, set = Ember.set;

/**
  Connects a model, view, controller, and template in a
  way that is consistent with router and {{render}} semantics

  @method wireMVC
  @param {Object} container the container
  @param {String} normalizedName the normalized path
  @param {Object} and optional context
  @param {Object} optional path overrides
*/
Ember.wireMVC = function(container, normalizedName, context, options) {
  var controller, view, template;

  if (controller = options.controller) {
    controller = container.lookup('controller:' + controller);
  } else {
    controller = Ember.controllerFor(container, normalizedName, context);
  }

  if (view = options.view) {
    view = container.lookup('view:' + view);
  } else {
    view = container.lookup('view:' + normalizedName) || container.lookup('view:default');
  }

  template = container.lookup('template:' + (options.template || normalizedName))

  if (controller && context) {
    controller.set('model', context);
  }

  return {
    controller: controller,
    view: view,
    template: template
  };
};
