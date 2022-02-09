import React from 'react';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import {Controlled as ControlledEditor} from 'react-codemirror2'


export default function Editor({displayName,language,value,OnChange}) {
  
    function handleChange(editor,data,value)
    {
        OnChange(value)
    }
  
  
    return (
      <div className='Editor-Container'>
          <div className="editortitle">
              {displayName}
              <button>O/C</button>
          </div>
          <ControlledEditor
              onBeforeChange={handleChange}
              value={value}
              className='code-mirror-wrapper'
              options={{
                  lineWrapping: true,
                  lint: true,
                  mode: language,
                  theme:'material',
                  lineNumbers:true
              }}
          
          />
    </div>
  );
}
