import Card from './Card';

function Detail({ photos, date, numPerRow }) {
    const cards = photos.map((photo, i) => (
        <Card
            index={i}
            url={photo.baseUrl}
            key={photo.id}
            numPerRow={numPerRow}
        />
    ));
    const rows = [];
    for (let i = 0; i < cards.length; i += numPerRow) {
        rows.push(
            <div key={i} className='row'>
                {cards.slice(i, i + numPerRow)}
            </div>
        )
    }
    return (
        <>
            <p className='vm-md'>Ipson lorem blah blah boopity boop blahph bawp boog doog droog dug gloog scrooooooge lah doob lickity stickity dop bop pop blawp.</p>
            {rows}
        </>
    )
}

export default Detail;