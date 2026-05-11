/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSResultGroup, LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';

import { formfieldDefinition } from '../elements/formfield';
import { selectDefinition } from '../elements/select';
import { switchDefinition } from '../elements/switch';
import { textfieldDefinition } from '../elements/textfield';

import { CARD_LANGUAGES } from './localize/localize';
import { UVIndexCardConfig, UVIndexCardLayout } from './types';

@customElement('uv-index-card-editor')
export class UVIndexCardEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: UVIndexCardConfig;

  @state() private _helpers?: any;

  private _initialized = false;

  static elementDefinitions = {
    ...textfieldDefinition,
    ...selectDefinition,
    ...switchDefinition,
    ...formfieldDefinition,
  };

  public setConfig(config: UVIndexCardConfig): void {
    this._config = config;
    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  private get _name(): string {
    return this._config?.name || '';
  }

  private get _entity(): string {
    return this._config?.entity || '';
  }

  private get _language(): string {
    return this._config?.language || '';
  }

  private get _layout(): UVIndexCardLayout {
    return this._config?.layout || 'full';
  }

  private get _decimals(): number {
    return this._config?.decimals ?? 1;
  }

  private get _show_name(): boolean {
    return this._config?.show_name ?? true;
  }

  private get _show_index(): boolean {
    return this._config?.show_index ?? true;
  }

  private get _show_risk(): boolean {
    return this._config?.show_risk ?? true;
  }

  private get _show_warning(): boolean {
    return this._config?.show_warning || false;
  }

  private get _show_error(): boolean {
    return this._config?.show_error || false;
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    const entities = Object.keys(this.hass.states);
    const layouts: UVIndexCardLayout[] = ['full', 'compact', 'icon'];

    return html`
      <mwc-select
        naturalMenuWidth
        fixedMenuPosition
        label="Entity (Required)"
        .configValue=${'entity'}
        .value=${this._entity}
        @selected=${this._valueChanged}
        @closed=${(ev: Event) => ev.stopPropagation()}
      >
        ${entities.map((entity) => html`<mwc-list-item .value=${entity}>${entity}</mwc-list-item>`)}
      </mwc-select>

      <mwc-textfield
        label="Name (Optional)"
        .value=${this._name}
        .configValue=${'name'}
        @input=${this._valueChanged}
      ></mwc-textfield>

      <mwc-select
        naturalMenuWidth
        fixedMenuPosition
        label="Layout"
        .configValue=${'layout'}
        .value=${this._layout}
        @selected=${this._valueChanged}
        @closed=${(ev: Event) => ev.stopPropagation()}
      >
        ${layouts.map((layout) => html`<mwc-list-item .value=${layout}>${layout}</mwc-list-item>`)}
      </mwc-select>

      <mwc-textfield
        label="Decimals"
        type="number"
        min="0"
        max="3"
        step="1"
        .value=${String(this._decimals)}
        .configValue=${'decimals'}
        @input=${this._valueChanged}
      ></mwc-textfield>

      <mwc-select
        naturalMenuWidth
        fixedMenuPosition
        label="Language (Optional)"
        .configValue=${'language'}
        .value=${this._language}
        @selected=${this._valueChanged}
        @closed=${(ev: Event) => ev.stopPropagation()}
      >
        ${CARD_LANGUAGES.map((languageItem) => html`<mwc-list-item .value=${languageItem}>${languageItem}</mwc-list-item>`)}
      </mwc-select>

      <mwc-formfield label="Show name">
        <mwc-switch
          .checked=${this._show_name}
          .configValue=${'show_name'}
          @change=${this._valueChanged}
        ></mwc-switch>
      </mwc-formfield>

      <mwc-formfield label="Show index">
        <mwc-switch
          .checked=${this._show_index}
          .configValue=${'show_index'}
          @change=${this._valueChanged}
        ></mwc-switch>
      </mwc-formfield>

      <mwc-formfield label="Show risk">
        <mwc-switch
          .checked=${this._show_risk}
          .configValue=${'show_risk'}
          @change=${this._valueChanged}
        ></mwc-switch>
      </mwc-formfield>

      <mwc-formfield label="Show warning">
        <mwc-switch
          .checked=${this._show_warning}
          .configValue=${'show_warning'}
          @change=${this._valueChanged}
        ></mwc-switch>
      </mwc-formfield>

      <mwc-formfield label="Show error">
        <mwc-switch
          .checked=${this._show_error}
          .configValue=${'show_error'}
          @change=${this._valueChanged}
        ></mwc-switch>
      </mwc-formfield>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;

    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _valueChanged(ev: Event): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const configValue = target.configValue;

    if (!configValue) {
      return;
    }

    let value = target.checked !== undefined ? target.checked : target.value;

    if (configValue === 'decimals') {
      value = Number.parseInt(value, 10);

      if (!Number.isFinite(value)) {
        value = 1;
      }

      value = Math.max(0, Math.min(3, value));
    }

    if (this[`_${configValue}`] === value) {
      return;
    }

    if (value === '') {
      const tmpConfig = { ...this._config };
      delete tmpConfig[configValue];
      this._config = tmpConfig;
    } else {
      this._config = {
        ...this._config,
        [configValue]: value,
      };
    }

    fireEvent(this, 'config-changed', { config: this._config });
  }

  static styles: CSSResultGroup = css`
    mwc-select,
    mwc-textfield {
      margin-bottom: 16px;
      display: block;
    }

    mwc-formfield {
      padding-bottom: 8px;
      display: block;
    }

    mwc-switch {
      --mdc-theme-secondary: var(--switch-checked-color);
    }
  `;
}
