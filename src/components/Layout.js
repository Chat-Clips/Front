import Header from "./Header/Header";
import Topbar from "./Top-bar/Top-bar";

const Layout=(props)=>{
    return(
        <div>
            <Topbar title={props.chat.title} roomId={props.chat.roomId} sidebar={props.foldsidebar}/>
            <main>
                {props.children}
            </main>
            <Header getinfo={props.handlechild} sidebarAction={props.handlesidebar}/>
        </div>
    );
}

export default Layout