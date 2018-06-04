import * as components from '../../component_types';
import snakeCase from 'lodash.snakecase';
import './create.scss';

function createTypeEnum(components) {
  var returned = {};
  let componentKeys = Object.keys(components);
  for(let i = 0; i< componentKeys.length; i++) {
    let snaked = snakeCase(componentKeys[i]).toString().split('_');
    snaked.pop();
    returned[componentKeys[i]] = snaked.join('_');
  }
  return returned;
}


const createable = {
  slug: 'string',
  type: createTypeEnum(components)
};

class CreateComponent extends React.Component {
  render() {
    const { component, onPrev, onNext, classNames, create } = this.props;
    console.warn(component.loading);
    return <div className={`component__container ${classNames}`}>
      <div className="component__center" >
        {`create ${component.component_type}`}
        {this.props.children}
      </div>
    </div>
  }
}

export { CreateComponent }
