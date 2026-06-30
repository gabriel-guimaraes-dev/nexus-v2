type UserProfileProps = {
    name: string;
    gold: number;
}

export function UserProfile(props: UserProfileProps) {
    return (
        <div style={{ background: '#c50c0c', color: 'white',padding: '10px'}}>
            <span>Player: {props.name} | Gold: {props.gold}</span>
        </div>
    )
}