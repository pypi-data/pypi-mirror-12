from ..lint_util import is_datasource


def lint_inputs(tool_xml, lint_ctx):
    datasource = is_datasource(tool_xml)
    inputs = tool_xml.findall("./inputs//param")
    num_inputs = 0
    for param in inputs:
        num_inputs += 1
        param_attrib = param.attrib
        has_errors = False
        if "type" not in param_attrib:
            lint_ctx.error("Found param input with no type specified.")
            has_errors = True
        if "name" not in param_attrib and "argument" not in param_attrib:
            lint_ctx.error("Found param input with no name specified.")
            has_errors = True

        if has_errors:
            continue

        param_type = param_attrib["type"]
        param_name = param_attrib.get("name", param_attrib.get("argument"))
        if param_type == "data":
            if "format" not in param_attrib:
                lint_ctx.warn("Param input [%s] with no format specified - 'data' format will be assumed.", param_name)
        # TODO: Validate type, much more...

    def find_list(elem, expression):
        matching = elem.findall(expression)
        if matching is None:
            return []
        else:
            return matching

    conditional_selects = tool_xml.findall("./inputs//conditional")
    for conditional in conditional_selects:
        booleans = find_list(conditional, "./param[@type='boolean']")
        selects = find_list(conditional, "./param[@type='select']")
        # Should conditionals ever not have a select?
        if not len(selects) and not len(booleans):
            lint_ctx.warn("Conditional without <param type=\"select\" /> or <param type=\"boolean\" />")
            continue

        for select in selects:
            select_options = select.findall('./option[@value]')
            if any(['value' not in option.attrib for option in select_options]):
                lint_ctx.error("Option without value")

            select_option_ids = [option.attrib.get('value', None) for option in select_options]

        for boolean in booleans:
            select_option_ids = [
                boolean.attrib.get('truevalue', 'true'),
                boolean.attrib.get('falsevalue', 'false')
            ]

        whens = conditional.findall('./when')
        if any(['value' not in when.attrib for when in whens]):
            lint_ctx.error("When without value")

        when_ids = [w.attrib.get('value', None) for w in whens]
        when_ids = [i.lower() if i in ["True", "False"] else i for i in when_ids]

        for select_id in select_option_ids:
            if select_id not in when_ids:
                lint_ctx.warn("No <when /> block found for select option '%s'" % select_id)

        for when_id in when_ids:
            if when_id not in select_option_ids:
                lint_ctx.warn("No <option /> block found for when block '%s'" % when_id)

    if datasource:
        for datasource_tag in ('display', 'uihints'):
            if not any([param.tag == datasource_tag for param in inputs]):
                lint_ctx.info("%s tag usually present in data sources" % datasource_tag)

    if num_inputs:
        lint_ctx.info("Found %d input parameters.", num_inputs)
    else:
        if datasource:
            lint_ctx.info("No input parameters, OK for data sources")
        else:
            lint_ctx.warn("Found no input parameters.")


def lint_repeats(tool_xml, lint_ctx):
    repeats = tool_xml.findall("./inputs//repeat")
    for repeat in repeats:
        if "name" not in repeat.attrib:
            lint_ctx.error("Repeat does not specify name attribute.")
        if "title" not in repeat.attrib:
            lint_ctx.error("Repeat does not specify title attribute.")
