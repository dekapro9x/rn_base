//Danh sách các địa điểm nổi bật của dự án.
import React, {PureComponent, Fragment} from 'react';
import MakerItemCustomView from './MakerItemCustomView';

export default class ListMaker extends PureComponent {
  itemMaker = (item, index) => {
    return <MakerItemCustomView item={item} index={index} />;
  };

  listMaker = () => {
    const {data} = this.props;
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item, index) => {
        return (
          <Fragment key={`${item.id}${index}`}>
            {this.itemMaker(item, index)}
          </Fragment>
        );
      });
    }
    return null;
  };
  render() {
    return <>{this.listMaker()}</>;
  }
}
