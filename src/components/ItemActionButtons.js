import h from 'react-hyperscript';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const className = 'btn btn-outline-secondary';

function ItemActionButtons({item, itemActions}) {
  return itemActions.map((itemAction, index) => {
    let componentOrTag;
    let props = {
      key: index,
    };

    switch (itemAction.type) {
      case 'link':
        componentOrTag = Link;
        props.className = className;
        props.to = itemAction.action(item);
        break;
      case 'button':
      default:
        componentOrTag = `button.${className.replace(' ', '.')}`;
        props.type = 'button';
        props.onClick = () => itemAction.action(item);
        break;
    }

    return h(componentOrTag, props, [
      h(Icon, { name: itemAction.icon }),
    ]);
  });
}

export default ItemActionButtons;
