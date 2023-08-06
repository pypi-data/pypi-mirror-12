import sys

import PyFBA

__author__ = 'Rob Edwards'


def suggest_from_roles(roles_file, reactions, threshold=0, verbose=False):
    """
    Identify a set of reactions that we should add based on a roles file.

    We assume that the roles file has the format:
        [role, probability]
    separated by tabs.

    :param threshold: the threshold for inclusion of the role based on the probability in the file (default = All roles)
    :type threshold: float
    :param roles_file: a file with a list of roles and their probabilities
    :type roles_file: str.
    :param reactions: The reactions dictionary from parsing the model seed
    :type reactions: dict.
    :param verbose: add additional output
    :type verbose: bool.
    :return: a set of reactions that could be added to test for growth
    :rtype: set.
    """

    role_suggestions = {}
    with open(roles_file, 'r') as rin:
        for l in rin:
            p = l.strip().split("\t")
            if float(p[1]) >= threshold:
                role_suggestions[p[0]] = p[1]

    if verbose:
        sys.stderr.write("Found " + str(len(role_suggestions)) + " roles to connect to reactions\n")

    reaction_suggestions = set()
    ro2rx = PyFBA.filters.roles_to_reactions(set(role_suggestions.keys()))

    for rxnset in ro2rx.values():
        reaction_suggestions.update(rxnset)

    # limit this to only those reactions that we know about!
    reaction_suggestions = {x for x in reaction_suggestions if x in reactions}

    if verbose:
        sys.stderr.write("Suggesting an additional " + str(len(reaction_suggestions)) + " reactions\n")

    return reaction_suggestions
