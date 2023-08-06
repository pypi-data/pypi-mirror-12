from rdflib import Graph as _Graph
from rdflib.namespace import (
    Namespace, NamespaceManager as _NamespaceManager,
    RDF, RDFS, OWL, XSD, FOAF, SKOS)  # VOID

SIOC = Namespace('http://rdfs.org/sioc/ns#')
OA = Namespace('http://www.openannotation.org/ns/')
CATALYST = Namespace('http://purl.org/catalyst/core#')
IDEA = Namespace('http://purl.org/catalyst/idea#')
IBIS = Namespace('http://purl.org/catalyst/ibis#')
VOTE = Namespace('http://purl.org/catalyst/vote#')
VERSION = Namespace('http://purl.org/catalyst/version#')
ASSEMBL = Namespace('http://purl.org/assembl/core#')
TIME = Namespace('http://www.w3.org/2006/time#')
QUADNAMES = Namespace('http://purl.org/assembl/quadnames/')
DCTERMS = Namespace('http://purl.org/dc/terms/')

namespace_manager = _NamespaceManager(_Graph())
_name, _var = None, None
for _name, _var in locals().iteritems():
    if _name[0] == '_':
        continue
    if isinstance(_var, Namespace):
        namespace_manager.bind(_name.lower(), _var)
