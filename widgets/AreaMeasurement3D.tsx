/**
 * The AreaMeasurement3D widget calculates and displays the area and perimeter of a polygon.
 * This widget can be used in a {@link module:esri/views/SceneView} to measure the area and perimeter of a polygon.
 *
 * [![measurement-line-3d](../../assets/img/apiref/widgets/area-measurement-3d.png)](../sample-code/widgets-measurement-3d/index.html)
 *
 * When the widget is active, a horizontal "laser" line is drawn which indicates the height at the current mouse position.
 * This line can help in analyzing the heights of objects relative to each other and the terrain.
 *
 * ::: esri-md class="panel trailer-1"
 * **Known Limitations**
 *
 * This widget is designed to work in 3D, so it can't be used in a {@link module:esri/views/MapView}.
 *
 * :::
 *
 * @example
 * var measurementWidget = new AreaMeasurement3D({
 *   view: view
 * });
 *
 * view.ui.add(measurementWidget, "top-right");
 *
 * @module esri/widgets/AreaMeasurement3D
 * @since 4.7
 *
 * @see [AreaMeasurement3D.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/AreaMeasurement3D.tsx)
 * @see [AreaMeasurement3D.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_AreaMeasurement3D.scss)
 * @see [Sample - Measurement in 3D](../sample-code/widgets-measurement-3d/index.html)
 * @see {@link module:esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel}
 * @see {@link module:esri/widgets/DirectLineMeasurement3D}
 * @see {@link module:esri/views/View#ui View.ui}
 * @see module:esri/views/ui/DefaultUI
 */

/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// dojo
import * as i18n from "dojo/i18n!esri/widgets/AreaMeasurement3D/nls/AreaMeasurement3D";

// esri.core.accessorSupport
import { aliasOf, subclass, property, declared } from "esri/core/accessorSupport/decorators";

// esri.views
import View = require("esri/views/View");

// esri.widgets
import Widget = require("esri/widgets/Widget");

// esri.widgets.AreaMeasurement3D
import AreaMeasurement3DViewModel = require("esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel");

// esri.widgets.support
import { tsx, renderable, accessibleHandler } from "esri/widgets/support/widget";

const CSS = {
  // common
  button: "esri-button esri-button--secondary",
  // base
  base: "esri-area-measurement-3d esri-widget esri-widget--panel",
  // container
  container: "esri-area-measurement-3d__container",
  // hint
  hint: "esri-area-measurement-3d__hint",
  panelError: "esri-area-measurement-3d__panel--error",
  // measurement
  measurement: "esri-area-measurement-3d__measurement",
  measurementItem: "esri-area-measurement-3d__measurement-item",
  measurementItemDisabled: "esri-area-measurement-3d__measurement-item--disabled",
  measurementItemTitle: "esri-area-measurement-3d__measurement-item-title",
  measurementItemValue: "esri-area-measurement-3d__measurement-item-value",
  // units
  units: "esri-area-measurement-3d__units",
  unitsLabel: "esri-area-measurement-3d__units-label",
  unitsSelect: "esri-area-measurement-3d__units-select esri-select",
  unitsSelectWrapper: "esri-area-measurement-3d__units-select-wrapper",
  // clear
  clearButton: "esri-area-measurement-3d__clear-button"
};

@subclass("esri.widgets.AreaMeasurement3D")
class AreaMeasurement3D extends declared(Widget) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * @constructor
   * @alias module:esri/widgets/AreaMeasurement3D
   * @extends module:esri/widgets/Widget
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                                that may be passed into the constructor.
   *
   * @example
   * // typical usage
   * var measurementWidget = new AreaMeasurement3D({
   *   view: view
   * });
   */
  constructor(params?: any) {
    super();
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  view
  //----------------------------------
  /**
   * A reference to the {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
   *
   * @name view
   * @instance
   * @type {module:esri/views/SceneView}
   */
  @aliasOf("viewModel.view")
  view: View = null;

  //----------------------------------
  //  visible
  //----------------------------------

  /**
   * Indicates whether the widget is visible.
   *
   * @name visible
   * @instance
   * @type {boolean}
   * @ignore
   */
  @aliasOf("viewModel.visible")
  @renderable()
  visible: boolean = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @type {module:esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel}
   * @autocast
   */
  @property({
    type: AreaMeasurement3DViewModel
  })
  @renderable([
    "viewModel.state",
    "viewModel.unitOptions",
    "viewModel.unit",
    "viewModel.measurement"
  ])
  viewModel: AreaMeasurement3DViewModel = new AreaMeasurement3DViewModel();

  //----------------------------------
  //  unitOptions
  //----------------------------------

  /**
   * List of unit options in the widget drop down list.
   *
   * @name unitOptions
   * @instance
   * @default ["metric", "imperial", "square-inches", "square-feet", "square-yards", "square-miles", "square-us-feet", "square-meters", "square-kilometers", "acres", "ares", "hectares"]
   * @type {string[]}
   */
  @aliasOf("viewModel.unitOptions")
  unitOptions: Array<AreaMeasurement3DViewModel.Unit> = null;

  //----------------------------------
  //  unit
  //----------------------------------
  /**
   * Unit system (imperial, metric) or specific unit used for displaying the distance values.
   *
   * **Possible Values:** imperial | metric | square-inches | square-feet | square-yards | square-miles | square-meters | square-kilometers | square-us-feet | acres | ares | hectares
   *
   * @name unit
   * @instance
   * @since 4.8
   * @type {string}
   */

  @aliasOf("viewModel.unit")
  unit: AreaMeasurement3DViewModel.Unit = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @aliasOf("viewModel.clearMeasurement")
  clearMeasurement(): void {}

  render() {
    const isUnsupported = !this.viewModel.isSupported;
    const isMeasuring = this.viewModel.state === "measuring";
    const isReady = this.viewModel.state === "ready";
    const measurement = this.viewModel.measurement;

    const hintNode = isReady ? (
      <section key="esri-area-measurement-3d__hint" class={CSS.hint}>
        <p>{i18n.hint}</p>
      </section>
    ) : null;

    const unsupportedNode = isUnsupported ? (
      <section key="esri-area-measurement-3d__unsupported" class={CSS.panelError}>
        <p>{i18n.unsupported}</p>
      </section>
    ) : null;

    const measurementLabelNode = (
      title: string,
      value: AreaMeasurement3DViewModel.MeasurementValue,
      key: string
    ) => {
      switch (value.state) {
        case "available":
          return (
            <div key={`${key}-enabled`} class={CSS.measurementItem}>
              <span class={CSS.measurementItemTitle}>{title}</span>
              <span class={CSS.measurementItemValue}>{value.text}</span>
            </div>
          );

        case "unavailable":
          return (
            <div
              key={`${key}-disabled`}
              class={this.classes(CSS.measurementItem, CSS.measurementItemDisabled)}
            >
              <span class={CSS.measurementItemTitle}>{title}</span>
            </div>
          );

        case "invalid":
          return (
            <div key={`${key}-enabled`} class={CSS.measurementItem}>
              <span class={CSS.measurementItemTitle}>{title}</span>
              <span class={CSS.measurementItemValue}>{i18n.notApplicable}</span>
            </div>
          );
      }
    };

    const measurementNode = isMeasuring ? (
      <section key="esri-area-measurement-3d__measurement" class={CSS.measurement}>
        {measurementLabelNode(i18n.area, measurement.area, "area")}
        {measurementLabelNode(
          i18n.perimeterLength,
          measurement.perimeterLength,
          "perimeter-length"
        )}
      </section>
    ) : null;

    const unitsId = `${this.id}__units`;

    const unitsLabelNode = (
      <label class={CSS.unitsLabel} for={unitsId}>
        {i18n.unit}
      </label>
    );

    const unitsSelectNode = (
      <div class={CSS.unitsSelectWrapper}>
        <select class={CSS.unitsSelect} id={unitsId} onchange={this._changeUnit} bind={this}>
          {this.viewModel.unitOptions.map(
            (unit) =>
              unit === this.viewModel.unit ? (
                <option key={unit} value={unit} selected>
                  {i18n.units[unit]}
                </option>
              ) : (
                <option key={unit} value={unit}>
                  {i18n.units[unit]}
                </option>
              )
          )}
        </select>
      </div>
    );

    const unitsNode = isMeasuring ? (
      <section key="esri-area-measurement-3d__units" class={CSS.units}>
        {unitsLabelNode}
        {unitsSelectNode}
      </section>
    ) : null;

    const newMeasurementNode = isMeasuring ? (
      <button
        class={this.classes(CSS.button, CSS.clearButton)}
        bind={this}
        onclick={this._newMeasurement}
      >
        {i18n.newMeasurement}
      </button>
    ) : null;

    const containerNode = this.visible ? (
      <div class={CSS.container}>
        {unsupportedNode}
        {hintNode}
        {measurementNode}
        {unitsNode}
        {newMeasurementNode}
      </div>
    ) : null;

    return (
      <div key="" class={CSS.base} role="presentation">
        {containerNode}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @accessibleHandler()
  private _newMeasurement() {
    this.clearMeasurement();
  }

  @accessibleHandler()
  private _changeUnit(event: Event) {
    const target = event.target as HTMLSelectElement;

    const selected = target.options[target.selectedIndex];

    if (selected) {
      this.unit = selected.value as AreaMeasurement3DViewModel.Unit;
    }
  }
}

export = AreaMeasurement3D;