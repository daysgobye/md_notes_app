import React from 'react'

import '../../base.sass'

export default ({ children }) => (
  <div className="page__section">
    <div className="page__section__content">{children}</div>
  </div>
)

//this is just a component that sets styled boundaries for "content"
//anything wrapped in this is styled by the main.sass file for general
//page layout, anything not wrapped in it is by default full width
