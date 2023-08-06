from lxml import etree as ET
from sphinxcontrib.autodoc_doxygen.xmlutils import format_xml_paragraph



def test_1():
    node = ET.fromstring("""<detaileddescription>
<para>Get a reference to a tabulated function that may appear in the energy expression.</para><para><parameterlist kind="param"><parameteritem>
<parameternamelist>
<parametername>index</parametername>
</parameternamelist>
<parameterdescription>
<para>the index of the function to get </para></parameterdescription>
</parameteritem>
</parameterlist>
<simplesect kind="return"><para>the <ref refid="classOpenMM_1_1TabulatedFunction" kindref="compound">TabulatedFunction</ref> object defining the function </para></simplesect>
</para>        </detaileddescription>
    """)

    expected = """
Get a reference to a tabulated function that may appear in the energy expression.

:param index: the index of the function to get

:returns: the :cpp:any:`TabulatedFunction` object defining the function

"""
    assert '\n'.join(format_xml_paragraph(node)) == expected


def test_2():
    node = ET.fromstring("""<detaileddescription><para><computeroutput><preformatted>
<ref refid="classOpenMM_1_1CustomIntegrator" kindref="compound">CustomIntegrator</ref> integrator(0.001);
integrator.addComputePerDof(&quot;v&quot;, &quot;v+0.5*dt*f/m&quot;);
integrator.addComputePerDof(&quot;x&quot;, &quot;x+dt*v&quot;);
integrator.addComputePerDof(&quot;v&quot;, &quot;v+0.5*dt*f/m&quot;);
</preformatted></computeroutput></para><para>The first step updates the velocities based on the current forces. The second step updates the positions based on the new velocities, and the third step updates the velocities again. Although the first and third steps look identical, the forces used in them are different. You do not need to tell the integrator that; it will recognize that the positions have changed and know to recompute the forces automatically.</para><para>The above example has two problems. First, it does not respect distance constraints. To make the integrator work with constraints, you need to add extra steps to tell it when and how to apply them. Second, it never gives Forces an opportunity to update the context state. This should be done every time step so that, for example, an <ref refid="classOpenMM_1_1AndersenThermostat" kindref="compound">AndersenThermostat</ref> can randomize velocities or a <ref refid="classOpenMM_1_1MonteCarloBarostat" kindref="compound">MonteCarloBarostat</ref> can scale particle positions. You need to add a step to tell the integrator when to do this. The following example corrects both these problems, using the RATTLE algorithm to apply constraints:</para><para><computeroutput><preformatted>
<ref refid="classOpenMM_1_1CustomIntegrator" kindref="compound">CustomIntegrator</ref> integrator(0.001);
integrator.addPerDofVariable(&quot;x1&quot;, 0);
integrator.addUpdateContextState();
integrator.addComputePerDof(&quot;v&quot;, &quot;v+0.5*dt*f/m&quot;);
integrator.addComputePerDof(&quot;x&quot;, &quot;x+dt*v&quot;);
integrator.addComputePerDof(&quot;x1&quot;, &quot;x&quot;);
integrator.addConstrainPositions();
integrator.addComputePerDof(&quot;v&quot;, &quot;v+0.5*dt*f/m+(x-x1)/dt&quot;);
integrator.addConstrainVelocities();
</preformatted></computeroutput></para></detaileddescription>""")
    #print(node)
    #print(format_xml_paragraph((node)))
    #print()
    expected = """
.. code-block:: C++


  CustomIntegrator integrator(0.001);
  integrator.addComputePerDof("v", "v+0.5*dt*f/m");
  integrator.addComputePerDof("x", "x+dt*v");
  integrator.addComputePerDof("v", "v+0.5*dt*f/m");


The first step updates the velocities based on the current forces. The second step updates the positions based on the new velocities, and the third step updates the velocities again. Although the first and third steps look identical, the forces used in them are different. You do not need to tell the integrator that; it will recognize that the positions have changed and know to recompute the forces automatically.

The above example has two problems. First, it does not respect distance constraints. To make the integrator work with constraints, you need to add extra steps to tell it when and how to apply them. Second, it never gives Forces an opportunity to update the context state. This should be done every time step so that, for example, an :cpp:any:`AndersenThermostat` can randomize velocities or a :cpp:any:`MonteCarloBarostat` can scale particle positions. You need to add a step to tell the integrator when to do this. The following example corrects both these problems, using the RATTLE algorithm to apply constraints:

.. code-block:: C++


  CustomIntegrator integrator(0.001);
  integrator.addPerDofVariable("x1", 0);
  integrator.addUpdateContextState();
  integrator.addComputePerDof("v", "v+0.5*dt*f/m");
  integrator.addComputePerDof("x", "x+dt*v");
  integrator.addComputePerDof("x1", "x");
  integrator.addConstrainPositions();
  integrator.addComputePerDof("v", "v+0.5*dt*f/m+(x-x1)/dt");
  integrator.addConstrainVelocities();

"""
    assert '\n'.join(format_xml_paragraph(node)) == expected


def test_3():
    node = ET.fromstring("""
<type><ref refid="classOpenMM_1_1CustomHbondForce_1afefd9143292586209274d8e355d8cba1" kindref="member">NonbondedMethod</ref></type>""")
    expected = ':cpp:any:`NonbondedMethod`'
    assert '\n'.join(format_xml_paragraph(node)) == expected
