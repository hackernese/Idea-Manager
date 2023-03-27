import Header from '../Components/Header'

function DefaultLayout({children}) {
    return (
        <div className='wrapper'>
            <Header />
            <div className='Container'>
                <div className='Content'>{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout;