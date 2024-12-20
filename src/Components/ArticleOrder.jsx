const ArticleOrder = ({ order, setOrder }) => {

    function handleOrderToggle() {
        setOrder(order === 'asc' ? 'desc' : 'asc');
      }

    return(
        <>
        <button onClick={handleOrderToggle}>
        {order === 'desc' ? 'Ascending' : 'Descending'}
      </button>
      </>
    )
}

export default ArticleOrder