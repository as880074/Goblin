import type { VenueComment } from "@/entities/comment/api/get-venue-comments";

type CommentListProps = {
  comments: VenueComment[];
};

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-sm text-mutedForeground">No comments yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {comments.map((comment) => (
        <li key={comment.id} className="rounded-lg border border-border bg-surface p-3 text-sm text-mutedForeground">
          {comment.body}
        </li>
      ))}
    </ul>
  );
}
