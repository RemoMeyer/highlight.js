/*
Language: Markup
Description: Labster EduXML markup extension
Author: Remo Meyer <remo@labster.com>
*/



function (hljs) {
  var EXTENSION_TYPE_ARRAY = [
    'Binding',
    'Calc',
    'CompositeConverter',
    'CompositeFilter',
    'ConditionalSelector',
    'ExpressionDebugger',
    'FieldValue',
    'MultiBinding',
    'RelativeSource',
    'StringFormat',
  ];

  var PARAMETER_TYPE_ARRAY = [
    'Aggregate',
    'AncestorLevel',
    'AncestorType',
    'Arg0',
    'Arg1',
    'Arg2',
    'Args',
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'Condition',
    'Converter',
    'ConverterParameter',
    'ElementId',
    'Expression',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'False',
    'Falsed',
    'FieldId',
    'Filter',
    'FilterParameter',
    'Id',
    'Mode',
    'Operation',
    'P1',
    'P2',
    'P3',
    'P4',
    'P5',
    'Path',
    'Scope',
    'Source',
    'Tag',
    'True',
    'Trued',
  ];

  var EXTENSION_TYPES = EXTENSION_TYPE_ARRAY.reduce((x, y) => x + ' ' + y);
  var PARAMETER_REG = '\\b((' + PARAMETER_TYPE_ARRAY.reduce((x, y) => x + ')|(' + y) + '))\\b';

  var PARAMETER_BEGIN = {
    variants: [{
      end: '=',
      returnEnd: true,
      className: 'attr',
      begin: PARAMETER_REG,  
    }]
  };

  var PARAMETER_STRING = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE],
    endsParent: true,
  };

  var PARAMETER_PATH = {
    begin: /\w+(\.\w*)*/y,
    className: 'variable',
    endsParent: true,
  };

  var PARAMETER_END = {
    begin: '=',
    excludeBegin: true,
    endsWithParent: true,
  };

  var DEFAULT_PARAMETER = {
    begin: /\w+(\.\w*)*/y,
    className: 'variable',
  };

  var PARAMETER = {
    end: ',',
    endsWithParent: true,
    contains: [PARAMETER_BEGIN, PARAMETER_END, DEFAULT_PARAMETER],
  };

  var MORE_PARAMETERS = {
    className: 'tag',
    end: '}',
    endsParent: true,
    contains: [PARAMETER],
  };

  var EXTENSION_NAME = {
    keywords: EXTENSION_TYPES,
    beginKeywords: EXTENSION_TYPES,
  };

  var MARKUP = {
    className: 'tag',
    begin: '{',
    end: '$$$',
    contains: [EXTENSION_NAME, MORE_PARAMETERS]
  };

  PARAMETER_END.contains = [
    {
      className: 'tag',
      begin: '{',
      end: '$$$',
      endsParent: true,
      contains: [EXTENSION_NAME, MORE_PARAMETERS]
    },
    PARAMETER_PATH, PARAMETER_STRING
  ];

  return {
    contains: [MARKUP]
  };
}
