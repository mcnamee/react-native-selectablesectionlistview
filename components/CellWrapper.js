'use strict';

import React, { Component } from 'react'
import {View} from 'react-native';

class CellWrapper extends Component {

  componentDidMount() {
    // this.props.updateTag && this.props.updateTag(this.refs.view.getNodeHandle(), this.props.sectionId);
  }

  render() {
    var Cell = this.props.component;
    return (
      <View ref='view'>
        <Cell {...this.props} />
      </View>
    );
  }
}

CellWrapper.propTypes = {

  /**
   * The id of the section
   */
  sectionId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),

  /**
   * A component to render for each cell
   */
  component: React.PropTypes.func.isRequired,

  /**
   * A function used to propagate the root nodes handle back to the parent
   */
  updateTag: React.PropTypes.func

};


module.exports = CellWrapper;
