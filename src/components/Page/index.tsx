import Header from "../Header";

interface IProps {
    headerTitle: string;
    children: JSX.Element | JSX.Element[];
}

export default function Page(props: IProps) {
    const { headerTitle, children } = props;
    return <div>
        <Header label={headerTitle}/>
        <div className="layout">{children}</div>
    </div>
}