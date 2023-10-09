import { Thread } from "@/types/Thread";

const ThreadComponent: React.FC<Thread> = ({ threadId, title, content, author, comments, community }) => {
    return (
        <div className="m-4 shadow-lg p-4">
            <h2>{title}</h2>
            <p>{content}</p>
            <p>By: {author.name}</p> {/* Assuming `User` has a `name` property */}
            <p>Community: {community.name}</p> {/* Assuming `Community` has a `name` property */}
            <div>
                {comments.map((comment) => (
                    <div key={comment.commentId} className="mt-2 border-t border-gray-200 pt-2">
                        <p>{comment.content}</p>
                        <p>By: {comment.author} at {comment.timestamp.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ThreadComponent;
