import React from 'react';
import { EAccordionHeadingColour } from './enum';
import Accordion from './Accordion';
import AccordionWrapper from './Accordion';
import { Loader } from '../Loader';

export default {
  title: 'Accordion',
  component: AccordionWrapper,
};

export const DifferentColors = () => (
  <>

  
    <Accordion>
      <Accordion.Item
        colour={EAccordionHeadingColour.GREY}
        id="item-1"
        title="Grey Title Section"
      >
        <div style={{ padding: '20px' }}>
          <Loader />
        </div>
      </Accordion.Item>
    </Accordion>
    <Accordion>
      <Accordion.Item
        colour={EAccordionHeadingColour.WHITE}
        id="item-1"
        title="White Title Section"
        level={2}
      >
        <div style={{ padding: '20px' }}>
          <Loader />
        </div>
      </Accordion.Item>
    </Accordion>
  </>
);

export const NestedPanels = () => (
  <Accordion>
    <Accordion.Item
      colour={EAccordionHeadingColour.WHITE}
      id="item-1"
      title="White Title Section"
    >
      <div style={{ padding: '20px' }}>
        <h3>Nested Accodrion</h3>
        <Accordion>
          <Accordion.Item
            colour={EAccordionHeadingColour.WHITE}
            id="item-1"
            level={2}
            title="Grey Title Section 1.1"
          >
            <div style={{ padding: '20px' }}>
              <Loader />
            </div>
          </Accordion.Item>
          <Accordion.Item
            colour={EAccordionHeadingColour.GREY}
            id="item-2"
            level={2}
            title="Grey Title Section 1.2"
          >
            <div style={{ padding: '20px' }}>
              <Loader />
            </div>
          </Accordion.Item>
        </Accordion>
      </div>
    </Accordion.Item>
    <Accordion.Item
      colour={EAccordionHeadingColour.GREY}
      id="item-2"
      title="Grey Title Section"
    >
      <div style={{ padding: '20px' }}>
        <h3>Nested Accodrion</h3>
        <Accordion>
          <Accordion.Item
            colour={EAccordionHeadingColour.WHITE}
            id="item-1"
            level={2}
            title="Grey Title Section 2.1"
          >
            <div style={{ padding: '20px' }}>
              <Loader />
            </div>
          </Accordion.Item>
          <Accordion.Item
            colour={EAccordionHeadingColour.GREY}
            id="item-2"
            level={2}
            title="Grey Title Section 2.2"
          >
            <div style={{ padding: '20px' }}>
              <Loader />
            </div>
          </Accordion.Item>
        </Accordion>
      </div>
    </Accordion.Item>
  </Accordion>
);
export const CollapseMode = () => (
  <>
    <h2>Single Expand</h2>
    <Accordion>
      <Accordion.Item
        colour={EAccordionHeadingColour.GREY}
        id="item-1"
        title="Grey Title Section"
      >
        <div style={{ padding: '20px' }}>
          <Loader />
        </div>
      </Accordion.Item>
      <Accordion.Item
        colour={EAccordionHeadingColour.WHITE}
        id="item-2"
        title="White Title Section"
      >
        <div style={{ padding: '20px' }}>
          <Loader />
        </div>
      </Accordion.Item>
    </Accordion>
    <br />
    <h2>Multi Expand</h2>
    <Accordion multiExpand>
      <Accordion.Item
        colour={EAccordionHeadingColour.GREY}
        id="item-1"
        title="Grey Title Section"
      >
        <div style={{ padding: '20px' }}>
          <Loader />
        </div>
      </Accordion.Item>
      <Accordion.Item
        colour={EAccordionHeadingColour.WHITE}
        id="item-2"
        title="White Title Section"
      >
        <div style={{ padding: '20px' }}>
          <Loader />
        </div>
      </Accordion.Item>
    </Accordion>
  </>
);

CollapseMode.story = {
  name: 'Single Expand vs Multi Expand',
};

export const DefaultExpanded = () => (
  <>
    <Accordion defaultExpanded={['item-1']}>
      <Accordion.Item
        colour={EAccordionHeadingColour.GREY}
        id="item-1"
        title="Grey Title Section"
      >
        <div style={{ padding: '20px' }}>
          <Loader />
        </div>
      </Accordion.Item>
      <Accordion.Item
        colour={EAccordionHeadingColour.WHITE}
        id="item-2"
        title="White Title Section"
      >
        <div style={{ padding: '20px' }}>
          <Loader />
        </div>
      </Accordion.Item>
    </Accordion>
    <br />
  </>
);

CollapseMode.story = {
  name: 'Single Expand vs Multi Expand',
};

export const CustomHeading = () => (
  <Accordion>
    <Accordion.Item colour={EAccordionHeadingColour.GREY} id="item-1">
      <Accordion.Heading>
        <h3>Grey Title Section</h3>
        <div>something custom</div>
      </Accordion.Heading>
      <div style={{ padding: '20px' }}>
        <Loader />
      </div>
    </Accordion.Item>

    <Accordion.Item
      colour={EAccordionHeadingColour.WHITE}
      id="item-2"
      title="White Title Section"
    >
      <div style={{ padding: '20px' }}>
        <h1>H1 - Bull Title</h1>
        <h2>H2 - Bull Title</h2>
        <h3>H3 - Bull Title </h3>
        <h4>H3 - Bull Title </h4>
        <h5>H3 - Bull Title </h5>
      </div>
    </Accordion.Item>
  </Accordion>
);
