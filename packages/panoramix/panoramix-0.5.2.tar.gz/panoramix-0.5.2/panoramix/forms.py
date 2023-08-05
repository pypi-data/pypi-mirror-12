from wtforms import (
    Field, Form, SelectMultipleField, SelectField, TextField, TextAreaField,
    BooleanField, IntegerField, HiddenField)
from wtforms import validators
from copy import copy
from panoramix import app
from six import string_types
config = app.config


class OmgWtForm(Form):
    field_order = tuple()
    css_classes = dict()

    @property
    def fields(self):
        fields = []
        for field in self.field_order:
            if hasattr(self, field):
                obj = getattr(self, field)
                if isinstance(obj, Field):
                    fields.append(getattr(self, field))
        return fields

    def get_field(self, fieldname):
        return getattr(self, fieldname)

    def field_css_classes(self, fieldname):
        if fieldname in self.css_classes:
            return " ".join(self.css_classes[fieldname])
        return ""


class FormFactory(object):
    row_limits = [10, 50, 100, 500, 1000, 5000, 10000, 50000]
    series_limits = [0, 5, 10, 25, 50, 100, 500]

    def __init__(self, viz):
        self.viz = viz
        from panoramix.viz import viz_types
        viz = self.viz
        datasource = viz.datasource
        default_metric = datasource.metrics_combo[0][0]
        default_groupby = datasource.groupby_column_names[0]
        group_by_choices = [(s, s) for s in datasource.groupby_column_names]
        # Pool of all the fields that can be used in Panoramix
        self.field_dict = {
            'viz_type': SelectField(
                'Viz',
                default='table',
                choices=[(k, v.verbose_name) for k, v in viz_types.items()],
                description="The type of visualization to display"),
            'metrics': SelectMultipleField(
                'Metrics', choices=datasource.metrics_combo,
                default=[default_metric],
                description="One or many metrics to display"),
            'metric': SelectField(
                'Metric', choices=datasource.metrics_combo,
                default=default_metric,
                description="One or many metrics to display"),
            'groupby': SelectMultipleField(
                'Group by',
                choices=self.choicify(datasource.groupby_column_names),
                description="One or many fields to group by"),
            'granularity': TextField(
                'Time Granularity', default="one day",
                description=(
                    "The time granularity for the visualization. Note that you "
                    "can type and use simple natural language as in '10 seconds', "
                    "'1 day' or '56 weeks'")),
            'granularity_sqla': SelectField(
                'Time Column', default=datasource.main_dttm_col,
                choices=self.choicify(datasource.dttm_cols),
                description=(
                    "The time granularity for the visualization. Note that you "
                    "can define arbitrary expression that return a DATETIME "
                    "column in the table editor")),
            'since': TextField(
                'Since', default="7 days ago", description=(
                    "Timestamp from filter. This supports free form typing and "
                    "natural language as in '1 day ago', '28 days' or '3 years'")),
            'until': TextField('Until', default="now"),
            'row_limit':
                SelectField(
                    'Row limit',
                    default=config.get("ROW_LIMIT"),
                    choices=self.choicify(self.row_limits)),
            'limit':
                SelectField(
                    'Series limit',
                    choices=self.choicify(self.series_limits),
                    default=50,
                    description=(
                        "Limits the number of time series that get displayed")),
            'rolling_type': SelectField(
                'Rolling',
                default='mean',
                choices=[(s, s) for s in ['mean', 'sum', 'std']],
                description=(
                    "Defines a rolling window function to apply")),
            'rolling_periods': IntegerField(
                'Periods',
                validators=[validators.optional()],
                description=(
                "Defines the size of the rolling window function, "
                "relative to the 'granularity' field")),
            'series': SelectField(
                'Series', choices=group_by_choices,
                default=default_groupby,
                description=(
                    "Defines the grouping of entities. "
                    "Each serie is shown as a specific color on the chart and "
                    "has a legend toggle")),
            'entity': SelectField('Entity', choices=group_by_choices,
                default=default_groupby,
                description="This define the element to be plotted on the chart"),
            'x': SelectField(
                'X Axis', choices=datasource.metrics_combo,
                default=default_metric,
                description="Metric assigned to the [X] axis"),
            'y': SelectField('Y Axis', choices=datasource.metrics_combo,
                default=default_metric,
                description="Metric assigned to the [Y] axis"),
            'size': SelectField(
                    'Bubble Size',
                    default=default_metric,
                    choices=datasource.metrics_combo),
            'where': TextField('Custom WHERE clause', default=''),
            'compare_lag': TextField('Comparison Period Lag',
                description="Based on granularity, number of time periods to compare against"),
            'compare_suffix': TextField('Comparison suffix',
                description="Suffix to apply after the percentage display"),
            'markup_type': SelectField(
                "Markup Type",
                choices=self.choicify(['markdown', 'html']),
                default="markdown",
                description="Pick your favorite markup language"),
            'rotation': SelectField(
                "Rotation",
                choices=[(s, s) for s in ['random', 'flat', 'square']],
                default="random",
                description="Rotation to apply to words in the cloud"),
            'line_interpolation': SelectField(
                "Line Interpolation",
                choices=self.choicify([
                    'linear', 'basis', 'cardinal', 'monotone',
                    'step-before', 'step-after']),
                default='linear',
                description="Line interpolation as defined by d3.js"),
            'code': TextAreaField("Code", description="Put your code here"),
            'size_from': TextField(
                "Font Size From",
                default="20",
                description="Font size for the smallest value in the list"),
            'size_to': TextField(
                "Font Size To",
                default="150",
                description="Font size for the biggest value in the list"),
            'show_brush': BooleanField(
                "Range Selector", default=True,
                description="Whether to display the time range interactive selector"),
            'show_legend': BooleanField(
                "Legend", default=True,
                description="Whether to display the legend (toggles)"),
            'rich_tooltip': BooleanField(
                "Rich Tooltip", default=True,
                description="The rich tooltip shows a list of all series for that point in time"),
            'y_axis_zero': BooleanField(
                "Y Axis Zero", default=False,
                description="Force the Y axis to start at 0 instead of the minimum value"),
            'y_log_scale': BooleanField(
                "Y Log", default=False,
                description="Use a log scale for the Y axis"),
            'x_log_scale': BooleanField(
                "X Log", default=False,
                description="Use a log scale for the X axis"),
            'donut': BooleanField(
                "Donut", default=False,
                description="Do you want a donut or a pie?"),
            'contribution': BooleanField(
                "Contribution", default=False,
                description="Compute the contribution to the total"),
            'num_period_compare': IntegerField(
                "Period Ratio", default=None,
                validators=[validators.optional()],
                description=(
                    "[integer] Number of period to compare against, "
                    "this is relative to the granularity selected")),
            'time_compare': TextField(
                "Time Shift Compare",
                default="",
                description=(
                    "Overlay a timeseries from a "
                    "relative time period. Expects relative time delta "
                    "in natural language (example: 24 hours, 7 days, "
                    "56 weeks, 365 days")),
        }

    @staticmethod
    def choicify(l):
        return [("{}".format(obj), "{}".format(obj)) for obj in l]

    def get_form(self, previous=False):
        px_form_fields = self.field_dict
        viz = self.viz
        datasource = viz.datasource
        field_css_classes = {k: ['form-control'] for k in px_form_fields.keys()}
        select2 = [
            'viz_type', 'metrics', 'groupby',
            'row_limit', 'rolling_type', 'series',
            'entity', 'x', 'y', 'size', 'rotation', 'metric', 'limit',
            'markup_type',]
        field_css_classes['since'] += ['select2_free_since']
        field_css_classes['until'] += ['select2_free_until']
        field_css_classes['granularity'] += ['select2_free_granularity']
        for field in ('show_brush', 'show_legend', 'rich_tooltip'):
            field_css_classes[field] += ['input-sm']
        for field in select2:
            field_css_classes[field] += ['select2']


        class QueryForm(OmgWtForm):
            field_order = copy(viz.form_fields)
            css_classes = field_css_classes
            standalone = HiddenField()
            async = HiddenField()
            json = HiddenField()
            previous_viz_type = HiddenField(default=viz.viz_type)

        filter_cols = datasource.filterable_column_names or ['']
        for i in range(10):
            setattr(QueryForm, 'flt_col_' + str(i), SelectField(
                'Filter 1',
                default=filter_cols[0],
                choices=self.choicify(filter_cols)))
            setattr(QueryForm, 'flt_op_' + str(i), SelectField(
                'Filter 1',
                default='in',
                choices=self.choicify(['in', 'not in'])))
            setattr(
                QueryForm, 'flt_eq_' + str(i),
                TextField("Super", default=''))
        for ff in viz.form_fields:
            if isinstance(ff, string_types):
                ff = [ff]
            for s in ff:
                if s:
                    setattr(QueryForm, s, px_form_fields[s])

        # datasource type specific form elements
        if datasource.__class__.__name__ == 'SqlaTable':
            QueryForm.field_order += ['where']
            setattr(QueryForm, 'where', px_form_fields['where'])

            if 'granularity' in viz.form_fields:
                setattr(
                    QueryForm,
                    'granularity', px_form_fields['granularity_sqla'])
                field_css_classes['granularity'] = ['form-control', 'select2']

        return QueryForm
