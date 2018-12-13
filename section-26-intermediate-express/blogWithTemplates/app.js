let express = require("express");
let app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/blogs/:blog', function (req, res) {
    let blog = Number(req.params.blog);
    let blogs = {
        blogs: ['Inspirational ideate, we must stand up gender rights living a fully ethical life disrupt to.Design thinking \
                strategize triple bottom line program areas engaging co - create equal opportunity shine entrepreneur.Bandwidth \
                technology uplift social enterprise resilient inspire scale and impact co - creation.Changemaker \
                because equal opportunity shine resilient.Shine milestones problem - solvers mass incarceration ecosystem.Preliminary \
                thinking program areas accessibility progress families.Low - hanging fruit green space best practices big data overcome \
                injustice progress emerging white paper.Parse, families grit citizen - centered natural resources gender rights innovate \
                triple bottom line.Move the needle boots on the ground resilient blended value indicators.Cultivate, venture \
                philanthropy revolutionary corporate social responsibility disrupt.Low - hanging fruit \
                vibrant benefit corporation our work human - centered transparent overcome injustice engaging accessibility. \
                Initiative mobilize blended value because resilient shared vocabulary justice.Activate empathetic thought \
                partnership thought leader challenges and opportunities peaceful social \
                return on investment capacity building best practices.Big data green space our work.',

                'Resilient her body her rights activate communities cultivate white paper changemaker.\
                Bandwidth inspirational social innovation co-create B-corp contextualize youth. Youth \
                rubric disrupt, problem-solvers global, compelling bandwidth technology challenges and \
                opportunities. Data cultivate, peaceful bandwidth replicable empower communities. Social \
                entrepreneur; ideate collective impact dynamic social enterprise systems thinking. Inspirational, \
                do-gooder communities inclusion storytelling greenwashing. Ecosystem; our work shine; technology \
                invest, our work overcome injustice paradigm. Vibrant social entrepreneur targeted, program areas \
                challenges and opportunities social innovation initiative dynamic. Move the needle ecosystem, \
                boots on the ground invest or then. Rubric, society movements unprecedented challenge unprecedented \
                challenge youth compassion. State of play save the world impact deep dive mobilize social capital social \
                innovation youth policymaker. Agile, shared value empower communities strategize venture philanthropy. \
                Green space, co-create shared vocabulary scalable empower. Engaging LGBTQ+ dynamic uplift social capital \
                fairness fairness, capacity building B-corp. Low-hanging fruit, to, progress youth program areas. \
                Communities engaging collaborative consumption.' ],

        headers: ['Inspirational ideate, we must stand up gender rights living a fully ethical life disrupt to.Design thinking \
                 strategize triple bottom line program areas engaging co - create equal opportunity shine entrepreneur.Bandwidth \
                 technology uplift social enterprise resilient inspire scale and impact co - creation.Changemaker \
                 because equal opportunity shine resilient.Shine milestones problem - solvers mass incarceration ecosystem.Preliminary \ ',

                 'Resilient her body her rights activate communities cultivate white paper changemaker.\
                 Bandwidth inspirational social innovation co-create B-corp contextualize youth. Youth \
                 rubric disrupt, problem-solvers global, compelling bandwidth technology challenges and \
                 opportunities. Data cultivate, peaceful bandwidth replicable empower communities.']
    };

    let blogToSend = blogs.blogs[blog - 1];

    if (!blogToSend) {
        res.send('Blog not published yet!!!');
    } else if (blog) {
        res.render('cssblog', {
            blog: blogToSend,
            header: blogs.headers[blog - 1]
        });
    }
});

app.get('*', function(req, res) {
    res.send('<h1>SADLY THAT DOES NOT EXIST</h1>');
});

app.listen(3000, function () {
    console.log('Server started on 3000');
});