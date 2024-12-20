const ArticleTopics = ({ selectedTopic, setSelectedTopic, topics}) => {

    function handleChange(event) {
        setSelectedTopic(event.target.value)
      }
     return(
        <>
        <label htmlFor="topics-dropdown">Filter by Topic: </label>
          <select 
          value={selectedTopic} 
          onChange={handleChange}
        >
          <option value="all">All</option>
          {topics.map((topic) => (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          ))}
        </select>
        </>
     )
}

export default ArticleTopics