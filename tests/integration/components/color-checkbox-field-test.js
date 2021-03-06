import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('color-checkbox-field', 'Integration | Component | color checkbox field', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{color-checkbox-field}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#color-checkbox-field}}
      template block text
    {{/color-checkbox-field}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
