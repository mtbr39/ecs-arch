using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InputManager : MonoBehaviour
{

    private GameObject _clickedObj;
    public GameObject clickedObj
    {
        get { return _clickedObj; }
    }
    public Vector2 mousePosition;

    void Update()
    {

        if (Input.GetMouseButtonDown(0))
        {
            mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            _clickedObj = GetClickedObj();
        }
    }

    GameObject GetClickedObj()
    {
        GameObject clickedGameObject = null;

        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        RaycastHit2D hit2d = Physics2D.Raycast((Vector2)ray.origin, (Vector2)ray.direction);

        if (hit2d)
        {
            clickedGameObject = hit2d.transform.gameObject;
        }

        return clickedGameObject;
    }
}