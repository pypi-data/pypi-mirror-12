"""Main program for the duolingo-graph command."""
import click
from .core import pull_graph, plot
from .numbers import CourseType
from .numbers import rank_courses, rank_avg_distance, \
    rank_progress, rank_avg_progress


__all__ = ['main']


class CLIData(object):
    """Data used by duolingo-graph command."""
    __slots__ = ('graph', 'n', 'kind')


_HELPS = {
    'no-hatching': "don't include hatching courses",
    'no-beta': "don't include hatching or beta courses",
    'progress': "don't include courses below given progress",
    'n': "limit number of courses to show (0 for no limit)",
    'learners': "only rank languages by courses for learners",
    'speakers': "only rank languages by courses for speakers",
}


@click.group()
@click.option('--no-hatching', '-h', 'phase', flag_value=2, type=click.INT,
              help=_HELPS['no-hatching'])
@click.option('--no-beta', '-b', 'phase', flag_value=3, type=click.INT,
              help=_HELPS['no-beta'])
@click.option('--progress', '-p', default=0, type=click.FLOAT,
              help=_HELPS['progress'])
@click.pass_context
def cli(ctx, phase, progress):
    """Graph the courses on Duolingo."""
    def load_graph():
        """Lazy function for loading the graph of languages."""
        click.echo('Connecting to Duolingo Incubator API...',
                   nl=False, err=True)
        graph = pull_graph(phase=phase or 1, progress=progress)
        click.echo('done.', err=True)
        return graph
    ctx.obj.graph = load_graph


@cli.group(name='rank-by')
@click.option('-n', default=0, type=click.IntRange(0, None),
              help=_HELPS['n'])
@click.option('--learners', '-l', 'kind', flag_value=CourseType.LEARNERS,
              help=_HELPS['learners'])
@click.option('--speakers', '-s', 'kind', flag_value=CourseType.SPEAKERS,
              help=_HELPS['speakers'])
@click.pass_context
def rank_by(ctx, n, kind):
    """Rank languages by some criteria."""
    ctx.obj.n = n
    ctx.obj.kind = kind or CourseType.BOTH


def print_ranks(ranks, label, labels, fmt):
    """
    Beautifully prints a list that's returned from either rank_courses or
    rank_progress.
    """
    if len(ranks) == 0:
        return
    width = max(len(('{:' + fmt + '}').format(amt)) for amt, _ in ranks)
    for amt, langs in ranks:
        print(('  {:' + str(width) + fmt + '}{} {}').format(
            amt,
            labels if float(amt) != 1 else label,
            (',\n' + ' ' * (2 + width + len(labels) + 1)).join(langs)
        ))


@rank_by.command()
@click.pass_context
def courses(ctx):
    """Rank by number of courses."""
    ranks = rank_courses(ctx.obj.graph(), ctx.obj.kind)
    print_ranks(
        ranks if ctx.obj.n == 0 else ranks[:ctx.obj.n],
        ' course: ', ' courses:', 'd',
    )


@rank_by.command(name='avg-distance')
@click.pass_context
def avg_distance(ctx):
    """Rank by average distance to a language."""
    ranks = rank_avg_distance(ctx.obj.graph(), ctx.obj.kind)
    print_ranks(
        ranks if ctx.obj.n == 0 else ranks[:ctx.obj.n],
        ' course away:', ' courses away:', '.4f',
    )


@rank_by.command(name='total-progress')
@click.pass_context
def total_progress(ctx):
    """Rank by total course progress."""
    ranks = rank_progress(ctx.obj.graph(), ctx.obj.kind)
    print_ranks(
        ranks if ctx.obj.n == 0 else ranks[:ctx.obj.n],
        '% progress:', '% progress:', '.4f',
    )


@rank_by.command(name='avg-progress')
@click.pass_context
def avg_progress(ctx):
    """Rank by average course progress."""
    ranks = rank_avg_progress(ctx.obj.graph(), ctx.obj.kind)
    print_ranks(
        ranks if ctx.obj.n == 0 else ranks[:ctx.obj.n],
        '% progress:', '% progress:', '.4f',
    )


@cli.command(name='plot')
@click.argument('file', required=False)
@click.pass_context
def plot_cli(ctx, file=None):
    """Visually graph the courses."""
    plot(ctx.obj.graph(), file=file)


def main():
    """Main function for duolingo_graph"""
    cli(obj=CLIData())

if __name__ == '__main__':
    main()
