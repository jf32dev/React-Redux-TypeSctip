import React from 'react';
import { MenuListComponentProps, components } from 'react-select';

const CustomMenuList = (props: MenuListComponentProps<any>) => {
  const {
    hasValue,
    getValue,
    selectProps: { menuIsOpen, isMulti },
  } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [selected, setSelected] = React.useState(null);

  // if menu is open and it is not multi
  // then scroll down until the position of selected item
  React.useEffect(() => {
    if (menuIsOpen && hasValue && !isMulti) {
      const selectedOption = getValue();
      const dom = React.Children.toArray(props.children).find(
        (child) =>
          (child as React.ReactElement).props.value === selectedOption[0].value
      ) as React.ReactElement;

      if (dom) {
        const { id } = dom.props.innerProps;

        const selectedOffsetTop = document.getElementById(id)?.offsetTop;
        if (ref && ref.current && selected !== id) {
          ref.current.scrollTo(0, selectedOffsetTop || 0);
          setSelected(id);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuIsOpen]);
  if (isMulti) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <components.MenuList {...props} />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <components.MenuList {...props} innerRef={ref} />;
};

export default CustomMenuList;
