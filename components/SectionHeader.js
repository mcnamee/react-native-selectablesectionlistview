'use strict';

import React, { Component } from 'react'
import {UIManager, StyleSheet, View, Text} from 'react-native';

class SectionHeader extends Component {

  componentDidMount() {
    // this.props.updateTag && this.props.updateTag(this.refs.view.getNodeHandle(), this.props.sectionId);
  }

  render() {
    var SectionComponent = this.props.component;
    var content = SectionComponent ?
      <SectionComponent {...this.props} /> :
      <Text style={styles.text}>{this.props.title}</Text>;

    return (
      <View ref="view" style={styles.container}>
        {content}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor:'#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ececec'
  },
  text: {
    fontWeight: '700',
    paddingTop:2,
    paddingBottom:2,
    paddingLeft: 2
  }
});

SectionHeader.propTypes = {

  /**
   * The id of the section
   */
  sectionId: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),

  /**
   * A component to render for each section item
   */
  component: React.PropTypes.func,

  /**
   * A function used to propagate the root nodes handle back to the parent
   */
  updateTag: React.PropTypes.func

};

module.exports = SectionHeader;
