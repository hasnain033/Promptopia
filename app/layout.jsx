import '@styles/global.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
export const metadata = {
    title : 'Promptopia',
    description : 'Discover & Share AI Prompts'
}

const layout = ({children}) => {
  return (
    <html>
        <body>
            <Provider>
            <div className='main'>
                <div className='gradiant'/>
            </div>
            <main className='app'>
                <Nav/>
                {children}
            </main>
            </Provider>
            
        </body>
    </html>
  )
}

export default layout