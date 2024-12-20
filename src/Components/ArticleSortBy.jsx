const ArticleSortBy = ({ sortBy, setSortBy }) => {

    function handleSortByChange(e) {
        setSortBy(e.target.value);
      }

    return (
        <>
        <label htmlFor="sort-by">Sort By:</label>
        <select value={sortBy} onChange={handleSortByChange}>
        <option value="created_at">Date</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment Count</option>
        </select></>
    )
}

export default ArticleSortBy