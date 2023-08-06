#!/usr/bin/env python

"""
Use URL to EUPS candidate tag file to git tag repos with official version
"""

# Technical Debt
# --------------
# - sort out the certificate so we don't have to supress warnings
# - completely hide eups-specifics from this file
# - skips non-github repos - can add repos.yaml knowhow to address this
# - worth doing the smart thing for externals? (yes for Sims)
# - deal with authentication version

# Known Bugs
# ----------
# Yeah, the candidate logic is broken, will fix

# import webbrowser
import logging
import os
import sys
import argparse
import textwrap
# from time import sleep
from datetime import datetime
from getpass import getuser
from string import maketrans
import urllib3
from .. import codetools


def parse_args():
    user = getuser()

    parser = argparse.ArgumentParser(
        prog='github-tag-version',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        description=textwrap.dedent("""

        Tag all repositories in a GitHub org using a team-based scheme

        Examples:
        github-tag-version.py --org lsst w.2015.33 b1630

        github-tag-version.py --org lsst --candidate v11_0_rc2 11.0.rc2 b1679

        """),
        epilog='Part of codekit: https://github.com/lsst-sqre/sqre-codekit'
    )

    # for safety, default to dummy org
    # will fail for most people but see github_fork_repos in this module
    # on how to get your own

    parser.add_argument('tag')
    parser.add_argument('manifest')
    parser.add_argument(
        '--org',
        default=user+'-shadow')
    parser.add_argument('--sims')
    parser.add_argument('--candidate')
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument(
        '--tagger',
        required=True,
        help='Name of person making the tag')
    parser.add_argument(
        '--email',
        required=True,
        help='Email address of tagger')
    parser.add_argument(
        '-u', '--user',
        required=True,
        help='GitHub username')
    parser.add_argument(
        '--token-path',
        default='~/.sq_github_token_delete',
        help='Use a token (made with github-auth) in a non-standard location')
    parser.add_argument(
        '-d', '--debug',
        action='store_true',
        default=os.getenv('DM_SQUARE_DEBUG'),
        help='Debug mode')
    parser.add_argument('-v', '--version',
                        action='version', version='%(prog)s 0.5')
    return parser.parse_args()


def main():
    args = parse_args()

    # we'll pass those as args later (see TD)
    orgname = args.org
    version = args.tag

    # The candidate is assumed to be the requested EUPS tag unless
    # otherwise specified with the --candidate option The reason to
    # currently do this is that for weeklies and other internal builds,
    # it's okay to eups publish the weekly and git tag post-facto. However
    # for official releases, we don't want to publish until the git tag
    # goes down, because we want to eups publish the build that has the
    # official versions in the eups ref.

    if args.candidate:
        candidate = args.candidate
    else:
        candidate = args.tag

    eupsbuild = args.manifest  # sadly we need to "just" know this
    message_template = 'Version {v} release from {c}/{b}'
    message = message_template.format(v=version, c=candidate, b=eupsbuild)
    eupspkg_site = 'https://sw.lsstcorp.org/eupspkg/'

    # generate timestamp for github API
    now = datetime.utcnow()
    timestamp = now.isoformat()[0:19]+'Z'
    if args.debug:
        print(timestamp)

    tagger = dict(name=args.tagg,
                  email=args.email,
                  date=timestamp)

    if args.debug:
        print tagger

    gh = codetools.login_github(token_path=args.token_path)
    if args.debug:
        print(type(gh))

    # org = gh.organization(orgname)
    if args.debug:
        print("Tagging repos in ", orgname)

    # generate eups-style version
    # eups no likey semantic versioning markup, wants underscores

    map = maketrans('.-', '__')

    # eups_version = version.translate(map)
    eups_candidate = candidate.translate(map)

    # construct url
    eupspkg_taglist = '/'.join((eupspkg_site, 'tags',
                                eups_candidate + '.list'))
    if args.debug:
        print eupspkg_taglist

    http = urllib3.PoolManager()
    # supress the certificate warning - technical debt
    urllib3.disable_warnings()  # NOQA
    if args.debug:
        # FIXME what's going on here? assigning a logger to a package?
        urllib3 = logging.getLogger('requests.packages.urllib3')  # NOQA
        stream_handler = logging.StreamHandler()
        logger = logging.getLogger('github3')
        logger.addHandler(stream_handler)
        logger.setLevel(logging.DEBUG)

    manifest = http.request('GET', eupspkg_taglist)

    if manifest.status >= 300:
        sys.exit("Failed GET")

    entries = manifest.data.split('\n')

    for entry in entries:
        # skip commented out and blank lines
        if entry.startswith('#'):
            continue
        if entry.startswith('EUPS'):
            continue
        if entry == '':
            continue

        # extract the repo and eups tag from the entry
        (upstream, generic, eups_tag) = entry.split()
        if args.debug:
            print upstream, eups_tag

        # okay so we still have the data dirs on gitolite
        # for now, just skip them and record them.
        # question is should they be on different tagging scheme anyway?
        # at this point these are: afwdata, astrometry_net_data qserv_testdata

        repo = gh.repository(orgname, upstream)

        # if the repo is not in github skip it for now
        # see TD
        if not hasattr(repo, 'name'):
            print '!!! SKIPPING', upstream, (60-len(upstream)) * '-'
            continue

        for team in repo.iter_teams():
            if team.name == 'Data Management':
                if args.debug or args.dry_run:
                    print repo.name.ljust(40), 'found in', team.name
                sha = codetools.eups2git_ref(eups_ref=eups_tag,
                                             repo=repo.name,
                                             eupsbuild=eupsbuild,
                                             debug=args.debug)
                if args.debug or args.dry_run:
                    print 'Will tag sha: {sha} as {v} (was {t})'.format(
                        sha=sha, v=version, t=eups_tag)

                if not args.dry_run:
                    repo.create_tag(tag=version,
                                    message=message,
                                    sha=sha,
                                    obj_type='commit',
                                    tagger=tagger,
                                    lightweight=False)

            elif team.name == 'DM External':
                if args.debug:
                    print repo.name, 'found in', team.name
            else:
                if args.debug:
                    print 'No action for', repo.name, 'belonging to', team.name


if __name__ == '__main__':
    main()
