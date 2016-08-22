'use strict';

import React, { Component } from 'react'
import {UIManager, StyleSheet, View, Text} from 'react-native';

var noop = () => {};
var returnTrue = () => true;

class SectionList extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSectionSelect = this.onSectionSelect.bind(this);
    this.resetSection = this.resetSection.bind(this);
    this.detectAndScrollToSection = this.detectAndScrollToSection.bind(this);
    this.lastSelectedIndex = null;
  }

  onSectionSelect(sectionId, fromTouch) {
    this.props.onSectionSelect && this.props.onSectionSelect(sectionId);

    if (!fromTouch) {
      this.lastSelectedIndex = null;
    }
  }

  resetSection() {
    this.lastSelectedIndex = null;
  }

  detectAndScrollToSection(e) {
    var ev = e.nativeEvent;
    var rect = {width:1, height:1, x: ev.locationX, y: ev.locationY};

    UIManager.measureViewsInRect(rect, e.target, noop, (frames) => {
      if (frames.length) {
        var index = frames[0].index;
        if (this.lastSelectedIndex !== index) {
          this.lastSelectedIndex = index;
          this.onSectionSelect(this.props.sections[index], true);
        }
      }
    });
  }

  render() {
    var SectionComponent = this.props.component;
    var sections = this.props.sections.map((section, index) => {
      var title = this.props.getSectionListTitle ?
        this.props.getSectionListTitle(section) :
        section;

      var child = SectionComponent ?
        <SectionComponent
          sectionId={section}
          title={title}
        /> :
        <View
          style={styles.item}>
          <Text style={styles.text}>{title}</Text>
        </View>;

      return (
        <View key={index} pointerEvents="none">
          {child}
        </View>
      );
    });

    return (
      <View style={[styles.container, this.props.style]}
        onStartShouldSetResponder={returnTrue}
        onMoveShouldSetResponder={returnTrue}
        onResponderGrant={this.detectAndScrollToSection}
        onResponderMove={this.detectAndScrollToSection}
        onResponderRelease={this.resetSection}
      >
        {sections}
      </View>
    );
  }
}

SectionList.propTypes = {

  /**
   * A component to render for each section item
   */
  component: React.PropTypes.func,

  /**
   * Function to provide a title the section list items.
   */
  getSectionListTitle: React.PropTypes.func,

  /**
   * Function to be called upon selecting a section list item
   */
  onSectionSelect: React.PropTypes.func,

  /**
   * The sections to render
   */
  sections: React.PropTypes.array.isRequired,

  /**
   * A style to apply to the section list container
   */
  style: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.object,
  ])
};

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems:'center',
    justifyContent:'center',
    right: 0,
    top: 0,
    bottom: 0,
    width: 15
  },

  item: {
    padding: 0
  },

  text: {
    fontWeight: '700',
    color: '#008fff'
  }
});

module.exports = SectionList;
