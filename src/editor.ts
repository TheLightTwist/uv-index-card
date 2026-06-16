/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSResultGroup, LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';

import { CARD_LANGUAGES } from './localize/localize';
import { UVIndexCardConfig, UVIndexCardLayout } from './types';

type HaFormSchema = Record<string, any>;
type HaFormValueChangedEvent = CustomEvent<{ value: Partial<UVIndexCardConfig> }>;

@customElement('uv-index-card-editor')
export class UVIndexCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: UVIndexCardConfig;

  public setConfig(config: UVIndexCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._formData}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private get _layout(): UVIndexCardLayout {
    return this._config?.layout || 'full';
  }

  private get _schema(): HaFormSchema[] {
    return [
      {
        name: 'entity',
        required: true,
        selector: {
          entity: {},
        },
      },
      {
        name: 'name',
        selector: {
          text: {},
        },
      },
      {
        name: 'layout',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'full', label: 'Full' },
              { value: 'compact', label: 'Compact' },
              { value: 'icon', label: 'Icon' },
            ],
          },
        },
      },
      {
        name: 'decimals',
        selector: {
          number: {
            min: 0,
            max: 3,
            step: 1,
            mode: 'box',
          },
        },
      },
      {
        name: 'language',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: '', label: 'Automatic' },
              ...CARD_LANGUAGES.map((language) => ({
                value: language,
                label: language,
              })),
            ],
          },
        },
      },
      {
        name: 'show_name',
        selector: {
          boolean: {},
        },
      },
      {
        name: 'show_index',
        selector: {
          boolean: {},
        },
      },
      {
        name: 'show_risk',
        selector: {
          boolean: {},
        },
      },
    ];
  }

  private get _formData(): Record<string, any> {
    return {
      entity: this._config?.entity || '',
      name: this._config?.name || '',
      layout: this._layout,
      decimals: this._config?.decimals ?? 1,
      language: this._config?.language || '',
      show_name: this._config?.show_name ?? this._layout !== 'icon',
      show_index: this._config?.show_index ?? this._layout !== 'icon',
      show_risk: this._config?.show_risk ?? this._layout !== 'icon',
    };
  }

  private _computeLabel = (schema: HaFormSchema): string => {
    switch (schema.name) {
      case 'entity':
        return 'Entity';
      case 'name':
        return 'Name';
      case 'layout':
        return 'Layout';
      case 'decimals':
        return 'Decimals';
      case 'language':
        return 'Language';
      case 'show_name':
        return 'Show name';
      case 'show_index':
        return 'Show index';
      case 'show_risk':
        return 'Show risk';
      default:
        return schema.name;
    }
  };

  private _valueChanged(ev: HaFormValueChangedEvent): void {
    if (!this._config) {
      return;
    }

    const value = ev.detail.value;
    const nextConfig: UVIndexCardConfig = {
      ...this._config,
      ...value,
    };

    if (!nextConfig.entity) {
      delete nextConfig.entity;
    }

    if (!nextConfig.name) {
      delete nextConfig.name;
    }

    if (!nextConfig.language) {
      delete nextConfig.language;
    }

    const decimals = Number(nextConfig.decimals ?? 1);
    nextConfig.decimals = Number.isFinite(decimals) ? Math.max(0, Math.min(3, Math.round(decimals))) : 1;

    this._config = nextConfig;
    fireEvent(this, 'config-changed', { config: nextConfig });
  }

  static styles: CSSResultGroup = css`
    :host {
      display: block;
    }
  `;
}
