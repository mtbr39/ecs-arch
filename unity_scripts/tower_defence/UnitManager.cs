using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UnitManager : MonoBehaviour
{

    InputManager inputManager;
    [SerializeField] GameObject[] units; //s
    public void AddUnit(GameObject unit)
    {
        Array.Resize(ref units, units.Length + 1);
        units[units.Length - 1] = unit;
    }
    GameObject ground;
    Unit selectedUnit = null;

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    void Start()
    {
        inputManager = GetComponent<InputManager>();
        ground = GameObject.Find("Background");

    }


    void Update()
    {

        foreach (GameObject unit in units)
        {
            if (unit == inputManager.clickedObj)
            {
                // unit.GetComponent<Unit>().Select();
                selectedUnit = unit.GetComponent<Unit>();
            }
        }

        if (inputManager.clickedObj == ground)
        {
            if (selectedUnit != null)
            {
                selectedUnit.targetPosition = inputManager.mousePosition;
            }

        }
    }
}
