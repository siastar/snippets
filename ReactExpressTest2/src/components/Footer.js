import React from 'react'
export default class Footer extends React.Component {
    
    render(){
        return (
            <footer class="footer mt-auto">
            <div class="copyright bg-white">
              <p>
                &copy; <span>{new Date().getFullYear()}</span> Copyright PG7ESTH
              </p>
            </div>
           
          </footer>

      
        )
    }
}
  
