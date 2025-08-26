import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './globals.css'
import './mobile-optimizations.css'
import './green-theme.css'
import './fonts.css'
import './unified-theme.css'
import './responsive.css'
import './header-fix.css'
import './apple-pay-styles.css'
import './card-icons-styles.css'
import './payment-layout-styles.css'
import './payment-text-spacing.css'
import './apple-pay-integration.css'
import './utils/ignoreWarnings.js'
import './utils/headerFix.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
