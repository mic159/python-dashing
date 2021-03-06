import React, {Component, PropTypes} from 'react';
import styles from './StatusList.css';
import {WidgetBox} from 'komodo';


export class StatusList extends Component {

  color(entry) {
    if (entry.status != undefined) {
      if (entry.status) {
        return '#1d8147';
      }
    } else if (this.props.threshold) {
      if (entry.value < this.props.threshold) {
        return '#1d8147';
      }
    }
    return '#e74c3c';
  }

  renderTitle() {
    if (!this.props.title) {
      return null;
    }
    return (
      <div className={styles.title}><h2>{this.props.title}</h2></div>
    );
  }

  render() {
    const lst = this.props.data || [];
    const statuses = lst.map((entry) => {
      const style = {
        backgroundColor: this.color(entry)
      };
      return (
        <div key={entry.title} className={styles.status_item} style={style}>
          <h2 className={styles.status_title}>{entry.title}</h2>
          <span className={styles.value}>{this.props.prefix}{entry.value}{this.props.suffix}</span>
        </div>
      );
    });
    return (
      <WidgetBox className={styles.container}>
        {this.renderTitle()}
        {statuses}
      </WidgetBox>
    )
  }
}

StatusList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      status: PropTypes.bool,
    }).isRequired
  ),
  threshold: PropTypes.number,
  title: PropTypes.string,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
};

StatusList.defaultProps = {
  suffix: '',
  prefix: '',
};
