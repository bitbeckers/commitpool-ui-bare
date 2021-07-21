'use strict';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerOne: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 36,
    lineHeight: 42,
    alignItems: "flex-end",
    textAlign: "center",
    color: "#FFFFFF"
  },
  container:{
    flexDirection: 'column',
    width: "100%",
    height: "100%",
    padding: 14
  },
  header:{
    marginBottom: 37
  },
  content: {
    flex: 1
  },
  footer:{
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

export default styles;
