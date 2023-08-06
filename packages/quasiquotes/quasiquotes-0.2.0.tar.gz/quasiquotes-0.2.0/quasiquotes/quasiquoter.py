from ctypes import pythonapi, c_int, py_object
from sys import _getframe


class QQNotImplementedError(NotImplementedError):
    def __init__(self, kind):
        if kind not in ('stmt', 'expr'):
            raise ValueError("'kind' must be either 'stmt' or 'expr'")
        self._kind = kind

    def __str__(self):
        if self._kind == 'stmt':
            kind = 'statements'
            syntax = 'with $qq: ...'
        else:
            kind = 'expressions'
            syntax = '[$qq|...|]'

        return 'quasiquoter does not support quoted %s (%s syntax)' % (
            kind,
            syntax,
        )


class QuasiQuoter:
    """Custom parsing logic for python
    """
    def __new__(cls, *args, **kwargs):
        if cls is QuasiQuoter:
            raise TypeError("cannot construct instances of 'QuasiQuoter'")
        return super().__new__(cls)

    def _quote_expr(self, col_offset, expr, _getframe=_getframe):
        return self.quote_expr(expr, _getframe(1), col_offset)

    @staticmethod
    def _quote_default(frame, kind):
        # Circular import for bootstrapping reasons.
        from .utils._traceback import new_tb

        raise QQNotImplementedError(kind).with_traceback(new_tb(frame))

    def quote_expr(self, expr, frame, col_offset):
        """Quote an expression.

        This is called in the oxford brackets case: [$qq|...|]

        Parameters
        ----------
        expr : str
            The expression to quote.
        frame : frame
            The stack frame where this expression is being executed.
        col_offset : int
            The column offset for the quasiquoter.

        Returns
        -------
        v : any
            The value of the quoted expression.
        """
        self._quote_default(frame, 'expr')

    def _quote_stmt(self, col_offset, stmt, _getframe=_getframe):
        self.quote_stmt(stmt, _getframe(1), col_offset)

    def quote_stmt(self, stmt, frame, col_offset):
        """Quote a statment.

        This is called in the enhanced with block case: with $qq: ...

        Parameters
        ----------
        stmt : str
            The statement to quote.
            This will have the unaltered indentation.
        frame : frame
            The stack frame where this statement is being executed.
        col_offset : int
            The column offset for the quasiquoter.
        """
        self._quote_default(frame, 'stmt')

    @staticmethod
    def locals_to_fast(frame,
                       *,
                       _locals_to_fast=pythonapi.PyFrame_LocalsToFast,
                       _pyobject=py_object,
                       _true=c_int(1)):
        """Write the ``f_locals`` of ``frame`` back into the fast local
        storage.

        Parameters
        ----------
        frame : frame
            The frame whose ``f_locals`` and fast will be synced.
        """
        _locals_to_fast(_pyobject(frame), _true)


class fromfile(QuasiQuoter):
    """Create a ``QuasiQuoter`` from an existing one that reads the body
    from a filename.

    Parameters
    ----------
    qq : QuasiQuoter
        The QuasiQuoter to wrap.

    Examples
    --------
    >>> from quasiquotes.quasiquoter import fromfile
    >>> from quasiquotes.c import c
    >>> include_c = fromfile(c)
    >>> # quote_expr on the contents of the file
    >>> [$include_c|mycode.c|]
    >>> # quote_stmt on the contents of the file
    >>> with $include_c:
    ...     mycode.c
    """
    def __init__(self, qq):
        self._qq = qq

    def quote_expr(self, filename, frame, col_offset):
        with open(filename.strip()) as f:
            return self._qq.quote_expr(
                ' ' * col_offset + f.read(), frame, col_offset
            )

    def quote_stmt(self, body, frame, col_offset):
        lines = body.splitlines()
        try:
            filename, = lines
        except ValueError:
            raise SyntaxError(
                'fromfile only accepts a single filename on the first line', (
                    frame.f_code.co_filename,
                    frame.f_lineno,
                    1,
                    lines[1].strip(),
                )
            ) from None

        with open(filename.strip()) as f:
            self._qq.quote_stmt(f.read(), frame, col_offset)
