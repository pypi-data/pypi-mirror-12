Jirafs-Latex
=============

This plugin provides two latex features for Jirafs --

* Automatically conversion of latex documents into PDF documents before
  uploading the PDF to JIRA.
* A ``{latex}`` macro block you can use in comments and ticket descriptions for
  embedding inline images or PDFs into your text.

Installation
------------

1. Install from PIP::

    pip install jirafs-latex

2. Enable for a ticket folder::

    jirafs plugins --enable=latex

Note that you can globally enable this (or any) plugin by adding the
``--global`` flag to the above command::

    jirafs plugins --global --enable=latex

Requirements
------------

* Requires ``xelatex``.

Using the Automatic Latex Compiler
----------------------------------

Simply place a file with a ``.tex`` extension in your ticket folder.  It'll
be compiled into a PDF automatically, and the PDF will be uploaded to JIRA
(not the ``.tex`` file) next time you push changes to JIRA.

Using the ``{latex}`` Macro Block
---------------------------------

Enter a latex block like so::

    {latex:name=somefilename.pdf}
    \documentclass{article}
    \usepackage{graphicx}
    
    \begin{document}
    
    \title{Introduction to \LaTeX{}}
    \author{Author's Name}
    
    \maketitle
    
    \begin{abstract}
    The abstract text goes here.
    \end{abstract}
    
    \section{Introduction}
    Here is the text of your introduction.
    
    \begin{equation}
        \label{simple_equation}
        \alpha = \sqrt{ \beta }
    \end{equation}
    
    \subsection{Subsection Heading Here}
    Write your subsection text here.
    
    \begin{figure}
        \centering
        \includegraphics[width=3.0in]{myfigure}
        \caption{Simulation Results}
        \label{simulationfigure}
    \end{figure}
    
    \section{Conclusion}
    Write your conclusion here.
    
    \end{document}
    {latex}

The above will be replaced with inline image JIRA markup (in this case,
``!somefilename.pdf!``) when submitting these changes to JIRA.

You **must** specify a ``name`` parameter in your opening ``{latex}`` tag;
that's the filename that will be uploaded to JIRA next time you submit changes.
Also, note that if you have the ``standalone`` latex plugin installed
and use it to convert your latex documents into PNG images instead, you
should specify a filename ending in ``png`` in your ``name`` parameter.

This is probably not important to you, but if you're curious about how this
works: what is happening here is the plugin writes your latex content
to a file, then asks xelatex to compile your document, then once that process
has completed, all files *except* the one matching the name you've submitted
are deleted.  After this point, everything works exactly as it does when
you're uploading a normal file.

