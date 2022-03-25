import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Button from './Button';

import { EButtonSize, EButtonVariant } from './enum';

import buttonStyle from './Button.module.scss';

export default {
  title: 'Button',
  component: Button,
};

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div>
      <h3>Big Bull</h3>
      <Button size={EButtonSize.BIG_BULL}>Big Bull Button</Button>
    </div>
    <div>
      <h3>Big</h3>
      <Button variant={EButtonVariant.PRIMARY} size={EButtonSize.BIG}>
        Big Bull Button
      </Button>
    </div>
    <div>
      <h3>Normal</h3>
      <Button variant={EButtonVariant.PRIMARY} size={EButtonSize.NORMAL}>
        Normal Button
      </Button>
    </div>
    <div>
      <h3>Small</h3>
      <Button variant={EButtonVariant.PRIMARY} size={EButtonSize.SMALL}>
        Small Button
      </Button>
    </div>
  </div>
);

export const Type = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <h3>Primary</h3>
        <Button variant={EButtonVariant.PRIMARY}>Primary</Button>{' '}
      </div>
      <div>
        <h3>Primary Red (Semantic Red)</h3>
        <Button variant={EButtonVariant.PRIMARY_RED}>Primary Red</Button>
      </div>
      <div>
        <h3>Primary Yellow (Semantic Yellow)</h3>
        <Button variant={EButtonVariant.PRIMARY_YELLOW}>Primary Yellow</Button>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <h3>Secondary</h3>
        <Button variant={EButtonVariant.SECONDARY}>Secondary</Button>
      </div>
      <div>
        <h3>Secondary White</h3>
        <Button variant={EButtonVariant.SECONDARY_WHITE}>
          Secondary White
        </Button>
      </div>
      <div>
        <h3>Secondary Red</h3>
        <Button variant={EButtonVariant.SECONDARY_RED}>Secondary Red</Button>
      </div>
      <div>
        <h3>Secondary Yellow</h3>
        <Button variant={EButtonVariant.SECONDARY_YELLOW}>Secondary Red</Button>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <h3>Button Text</h3>
        <Button variant={EButtonVariant.BUTTON_TEXT}>Link</Button>
      </div>
      <div>
        <h3>Button Hidden</h3>
        <Button variant={EButtonVariant.BUTTON_HIDDEN}>Link</Button>
      </div>
      <div>
        <h3>Button Link</h3>
        <Button variant={EButtonVariant.BUTTON_LINK}>Link</Button>
      </div>
    </div>
  </div>
);

export const withIcon = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div>
      <h3>Default with Icon</h3>
      <Button variant={EButtonVariant.PRIMARY}>
        <span className="icon icon-pho-portrait" />
        Primary
      </Button>
    </div>
    <div>
      <h3>Default with Icon</h3>
      <Button size={EButtonSize.BIG_BULL} variant={EButtonVariant.PRIMARY}>
        <span className="icon icon-pho-portrait" />
        Primary
      </Button>
    </div>
    <div>
      <h3>Reverse Icon</h3>
      <Button variant={EButtonVariant.PRIMARY_RED} reverse>
        Primary <span className="icon icon-pho-portrait" />
      </Button>
    </div>
    <div>
      <h3>Icon Only</h3>
      <Button variant={EButtonVariant.PRIMARY_YELLOW} iconOnly>
        <span className="icon icon-pho-portrait" />
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant={EButtonVariant.SECONDARY_WHITE} iconOnly>
        <span className="icon icon-pho-portrait" />
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant={EButtonVariant.SECONDARY_RED} iconOnly>
        <span className="icon icon-pho-portrait" />
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant={EButtonVariant.SECONDARY_YELLOW} iconOnly>
        <span className="icon icon-pho-portrait" />
      </Button>
    </div>
    <div>
      <h3>Icon Link</h3>
      <Button variant={EButtonVariant.BUTTON_HIDDEN} reverse>
        Primary <span className="icon icon-pho-portrait" />
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant={EButtonVariant.BUTTON_HIDDEN}>
        <span className="icon icon-pho-portrait" /> Primary
      </Button>
    </div>
  </div>
);

export const State = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div>
      <h3>Active</h3>
      <Button variant={EButtonVariant.PRIMARY} active>
        <span className="icon icon-pho-portrait" />
        Primary
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant={EButtonVariant.SECONDARY_WHITE} active>
        Active
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant={EButtonVariant.PRIMARY_RED} active>
        Active
      </Button>
    </div>
    <div>
      <h3>Disabled</h3>
      <Button variant={EButtonVariant.PRIMARY} disabled>
        <span className="icon icon-pho-portrait" />
        Primary
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant={EButtonVariant.SECONDARY_WHITE} disabled>
        Disabled
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant={EButtonVariant.PRIMARY_RED} disabled>
        Disabled
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button variant={EButtonVariant.BUTTON_LINK} disabled>
        Button link
      </Button>
    </div>
  </div>
);

export const AnchorAsButton = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div>
      <h3>HTML Anchor Tag</h3>
      <a role="button" href="/" className={buttonStyle.button}>
        Link
      </a>
    </div>
    <div>
      <h3>React Router Dom Link</h3>
      <Link
        to="/"
        role="button"
        className={cx(
          buttonStyle.button,
          buttonStyle[EButtonVariant.PRIMARY_RED]
        )}
      >
        Link
      </Link>
      &nbsp;&nbsp;&nbsp;
      <Link
        to="/"
        role="button"
        className={cx(
          buttonStyle.button,
          buttonStyle[EButtonVariant.PRIMARY],
          buttonStyle[EButtonSize.BIG_BULL]
        )}
      >
        React Router Link
      </Link>
    </div>
  </div>
);

export const Group = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div>
      <h3>Small</h3>
      <Button.Group>
        <Button variant={EButtonVariant.PRIMARY} size={EButtonSize.SMALL}>
          Small Button
        </Button>
        <Button variant={EButtonVariant.SECONDARY} size={EButtonSize.SMALL}>
          Small Button
        </Button>
        <Button
          variant={EButtonVariant.PRIMARY_YELLOW}
          size={EButtonSize.SMALL}
        >
          Small Button
        </Button>
      </Button.Group>
    </div>
    <div>
      <h3>Normal</h3>
      <Button.Group>
        <Button variant={EButtonVariant.PRIMARY} size={EButtonSize.NORMAL}>
          NORMAL Button
        </Button>
        <Button variant={EButtonVariant.SECONDARY} size={EButtonSize.NORMAL}>
          NORMAL Button
        </Button>
        <Button
          variant={EButtonVariant.PRIMARY_YELLOW}
          size={EButtonSize.NORMAL}
        >
          NORMAL Button
        </Button>
      </Button.Group>
    </div>
    <div>
      <h3>Big</h3>
      <Button.Group>
        <Button variant={EButtonVariant.PRIMARY} size={EButtonSize.BIG}>
          BIG Button
        </Button>
        <Button variant={EButtonVariant.SECONDARY} size={EButtonSize.BIG}>
          BIG Button
        </Button>
        <Button variant={EButtonVariant.PRIMARY_YELLOW} size={EButtonSize.BIG}>
          BIG Button
        </Button>
      </Button.Group>
    </div>
  </div>
);
