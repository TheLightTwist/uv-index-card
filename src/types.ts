import {
  ActionConfig,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'uv-index-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export type UVIndexCardLayout = 'full' | 'compact' | 'icon';

export interface UVIndexCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  entity?: string;
  language?: string;
  layout?: UVIndexCardLayout;
  show_name?: boolean;
  show_index?: boolean;
  show_risk?: boolean;
  decimals?: number;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
