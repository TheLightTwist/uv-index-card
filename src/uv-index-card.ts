/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CSSResultGroup,
  LitElement,
  PropertyValues,
  TemplateResult,
  css,
  html,
  nothing,
} from 'lit';
import { customElement, property, state } from 'lit/decorators';
import {
  ActionHandlerEvent,
  HomeAssistant,
  getLovelace,
  handleAction,
  hasAction,
  hasConfigOrEntityChanged,
} from 'custom-card-helpers';

import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';
import type { UVIndexCardConfig, UVIndexCardLayout } from './types';

import './editor';

console.info(
  `%c  UV-INDEX-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'uv-index-card',
  name: 'UV Index Card',
  preview: true,
  description: 'A Lovelace card that shows the UV index and risk level for Home Assistant',
});

type UVRisk = 'low' | 'moderate' | 'high' | 'very_high' | 'extreme';

interface UVSegment {
  threshold: number;
  risk: UVRisk;
  points: string;
}

const UV_SEGMENTS: UVSegment[] = [
  {
    threshold: 12,
    risk: 'extreme',
    points: '81.9537723 2.99975159 77.2979826 10.4602611 86.4956236 10.4362484',
  },
  {
    threshold: 11,
    risk: 'extreme',
    points: '92.8108692 20.7694268 70.8323051 20.8356688 76.2650231 12.1248408 87.5102538 12.0925478',
  },
  {
    threshold: 10,
    risk: 'very_high',
    points: '99.1192621 31.0946561 64.3589492 31.2022994 69.7916672 22.4914713 93.8186467 22.4177771',
  },
  {
    threshold: 9,
    risk: 'very_high',
    points: '105.434921 41.428828 57.8945103 41.5778726 63.3272282 32.8670446 100.134305 32.751121',
  },
  {
    threshold: 8,
    risk: 'very_high',
    points: '111.751405 51.7620892 51.4218149 51.9450828 56.8627892 43.2334268 106.442533 43.0769299',
  },
  {
    threshold: 7,
    risk: 'high',
    points: '118.058972 62.0882293 44.9567154 62.3192484 50.3894333 53.6092484 112.758356 53.4105223',
  },
  {
    threshold: 6,
    risk: 'high',
    points: '124.367447 72.4134586 38.4834421 72.686707 43.9244164 63.975879 119.066832 63.7440318',
  },
  {
    threshold: 5,
    risk: 'moderate',
    points: '130.17996 81.9276369 32.5388267 82.2331783 37.4513908 74.3512038 125.38216 74.0696752',
  },
  {
    threshold: 4,
    risk: 'moderate',
    points: '136.495618 92.2528662 26.0661313 92.6006369 31.4988492 83.8889809 131.195003 83.5759873',
  },
  {
    threshold: 3,
    risk: 'moderate',
    points: '142.804011 102.58621 19.6010318 102.96793 25.0337497 94.2562739 137.503396 93.9093312',
  },
  {
    threshold: 2,
    risk: 'low',
    points: '149.111661 112.912268 13.1285841 113.342841 18.5613021 104.632013 143.819302 104.242013',
  },
  {
    threshold: 1,
    risk: 'low',
    points: '155.427732 123.23758 6.66373231 123.717834 12.0964503 115.007006 150.127117 114.560701',
  },
  {
    threshold: 0,
    risk: 'low',
    points: '5.62342462 125.373554 0.999834872 132.792662 161.264189 132.792662 156.435014 124.893299',
  },
];

@customElement('uv-index-card')
export class UVIndexCard extends LitElement {
  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement('uv-index-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      name: 'UV Index',
      layout: 'full',
      show_name: true,
      show_index: true,
      show_risk: true,
      decimals: 1,
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: UVIndexCardConfig;

  public setConfig(config: UVIndexCardConfig): void {
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      name: 'UV Index',
      layout: 'full',
      show_name: true,
      show_index: true,
      show_risk: true,
      decimals: 1,
      show_warning: false,
      show_error: false,
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected render(): TemplateResult | void {
    if (this.config.show_warning) {
      return this._showWarning(localize('common.show_warning', '', '', this.config.language));
    }

    if (this.config.show_error) {
      return this._showError(localize('common.show_error', '', '', this.config.language));
    }

    const entityId = this.config.entity;
    const entityState = entityId ? this.hass.states[entityId] : undefined;

    if (!entityId || !entityState) {
      return this._showWarning(localize('common.invalid_configuration', '', '', this.config.language));
    }

    const uvIndex = this._parseUvIndex(entityState.state);

    if (uvIndex === undefined) {
      return this._showWarning('UV index entity state is unavailable');
    }

    const layout = this._layout;

    if (layout === 'compact') {
      return this._renderCard(this._renderCompact(uvIndex), 'compact');
    }

    if (layout === 'icon') {
      return this._renderCard(this._renderIcon(uvIndex), 'icon');
    }

    return this._renderCard(this._renderFull(uvIndex), 'full');
  }

  private get _layout(): UVIndexCardLayout {
    const layout = this.config.layout ?? 'full';

    if (layout === 'compact' || layout === 'icon' || layout === 'full') {
      return layout;
    }

    return 'full';
  }

  private get _decimals(): number {
    const decimals = Number(this.config.decimals ?? 1);

    if (!Number.isFinite(decimals)) {
      return 1;
    }

    return Math.max(0, Math.min(3, Math.round(decimals)));
  }

  private _parseUvIndex(rawState: string): number | undefined {
    if (rawState === 'unknown' || rawState === 'unavailable' || rawState === '') {
      return undefined;
    }

    const value = Number.parseFloat(rawState);

    if (!Number.isFinite(value)) {
      return undefined;
    }

    return Math.max(0, value);
  }

  private _renderCard(content: TemplateResult, layout: UVIndexCardLayout): TemplateResult {
    const showHeader = layout === 'full' && this.config.show_name !== false;

    return html`
      <ha-card
        class=${`layout-${layout}`}
        .header=${showHeader ? this.config.name : undefined}
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
          hasHold: hasAction(this.config.hold_action),
          hasDoubleClick: hasAction(this.config.double_tap_action),
        })}
        tabindex="0"
        .label=${`UV Index: ${this.config.entity || 'No Entity Defined'}`}
      >
        ${content}
      </ha-card>
    `;
  }

  private _renderFull(uvIndex: number): TemplateResult {
    const risk = this._riskForIndex(uvIndex);
    const showIndex = this.config.show_index ?? true;
    const showRisk = this.config.show_risk ?? true;

    return html`
      <div class="full-card">
        <div class="full-pyramid">${this._renderPyramid(uvIndex)}</div>
        <div class="full-content">
          ${showIndex
            ? html`
                <div class="full-row">
                  <span class="label">${localize('common.uv_index', '', '', this.config.language)}</span><br />
                  <span class="value">${this._formatUvIndex(uvIndex)}</span>
                </div>
              `
            : nothing}
          ${showRisk
            ? html`
                <div class="full-row">
                  <span class="label">${localize('common.uv_risk', '', '', this.config.language)}</span><br />
                  <span class="risk">${this._riskText(risk)}</span>
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderCompact(uvIndex: number): TemplateResult {
    const risk = this._riskForIndex(uvIndex);
    const showName = this.config.show_name ?? true;
    const showIndex = this.config.show_index ?? true;
    const showRisk = this.config.show_risk ?? true;

    return html`
      <div class="compact-card">
        <div class="compact-content">
          ${showName ? html`<div class="compact-name">${this.config.name || 'UV Index'}</div>` : nothing}
          ${showIndex ? html`<div class="compact-index">${this._formatUvIndex(uvIndex)}</div>` : nothing}
          ${showRisk ? html`<div class="compact-risk">${this._riskText(risk)}</div>` : nothing}
        </div>
        <div class="compact-pyramid">${this._renderPyramid(uvIndex)}</div>
      </div>
    `;
  }

  private _renderIcon(uvIndex: number): TemplateResult {
    return html`
      <div class="icon-card">
        ${this._renderPyramid(uvIndex)}
      </div>
    `;
  }

  private _renderPyramid(uvIndex: number): TemplateResult {
    return html`
      <svg
        class="uv-pyramid"
        viewBox="0 0 162 136"
        preserveAspectRatio="xMidYMid meet"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label=${`${localize('common.uv_index', '', '', this.config.language)} ${this._formatUvIndex(uvIndex)}`}
      >
        <title>UV</title>
        <g id="UV-Index-Triangle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          ${UV_SEGMENTS.map((segment) => {
            const active = uvIndex >= segment.threshold;
            return html`
              <polygon
                class="uv-segment"
                points=${segment.points}
                fill=${active ? this._riskColor(segment.risk) : this._idleColor}
              ></polygon>
            `;
          })}
        </g>
      </svg>
    `;
  }

  private get _idleColor(): string {
    return '#ededed';
  }

  private _riskColor(risk: UVRisk): string {
    const colors: Record<UVRisk, string> = {
      low: 'green',
      moderate: 'yellow',
      high: 'orange',
      very_high: 'red',
      extreme: 'blueviolet',
    };

    return colors[risk];
  }

  private _riskForIndex(uvIndex: number): UVRisk {
    if (uvIndex >= 11) {
      return 'extreme';
    }

    if (uvIndex >= 8) {
      return 'very_high';
    }

    if (uvIndex >= 6) {
      return 'high';
    }

    if (uvIndex >= 3) {
      return 'moderate';
    }

    return 'low';
  }

  private _riskText(risk: UVRisk): string {
    const key = risk === 'very_high' ? 'uv_levels.very_high' : `uv_levels.${risk}`;
    return localize(key, '', '', this.config.language);
  }

  private _formatUvIndex(uvIndex: number): string {
    const decimals = this._decimals;
    const language = this.hass?.locale?.language || this.config.language || undefined;

    try {
      return uvIndex.toLocaleString(language, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } catch (e) {
      return uvIndex.toFixed(decimals);
    }
  }

  private _handleAction(ev: ActionHandlerEvent): void {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action);
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html`<hui-warning>${warning}</hui-warning>`;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');

    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html`${errorCard}`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        box-sizing: border-box;
        height: 100%;
        overflow: hidden;
      }

      ha-card.layout-compact {
        min-height: 140px;
      }

      .full-card {
        box-sizing: border-box;
        display: grid;
        grid-template-columns: minmax(84px, 45%) minmax(0, 1fr);
        gap: 12px;
        align-items: center;
        padding: 12px;
      }

      .full-pyramid,
      .compact-pyramid {
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .full-pyramid {
        justify-content: center;
      }

      .full-content {
        min-width: 0;
        line-height: 1.45;
      }

      .full-row + .full-row {
        margin-top: 8px;
      }

      .label {
        color: var(--primary-text-color);
        font-weight: bold;
      }

      .value,
      .risk {
        color: var(--primary-text-color);
      }

      .compact-card {
        box-sizing: border-box;
        min-height: 140px;
        padding: 16px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(86px, 42%);
        gap: 12px;
        align-items: center;
      }

      .compact-content {
        min-width: 0;
        z-index: 1;
      }

      .compact-name {
        color: var(--primary-text-color);
        font-family: var(--ha-font-family-body, var(--primary-font-family));
        font-size: var(--ha-card-header-font-size, 16px);
        font-weight: 500;
        line-height: 20px;
        margin-bottom: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .compact-index {
        color: var(--primary-text-color);
        font-family: var(--ha-font-family-body, var(--primary-font-family));
        font-size: 32px;
        font-weight: 400;
        line-height: 36px;
        letter-spacing: 0;
      }

      .compact-risk {
        margin-top: 4px;
        color: var(--secondary-text-color);
        font-family: var(--ha-font-family-body, var(--primary-font-family));
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .compact-pyramid {
        justify-content: flex-end;
        height: 100%;
      }

      .icon-card {
        box-sizing: border-box;
        min-height: 80px;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .uv-pyramid {
        width: 100%;
        height: auto;
        max-width: var(--uv-index-card-pyramid-size, 120px);
        aspect-ratio: 162 / 136;
        display: block;
        flex: 0 1 auto;
      }

      .compact-pyramid .uv-pyramid {
        max-width: var(--uv-index-card-compact-pyramid-size, 112px);
        max-height: 104px;
      }

      .icon-card .uv-pyramid {
        max-width: var(--uv-index-card-pyramid-size, 64px);
      }

      .uv-segment {
        opacity: 1;
      }
    `;
  }
}
