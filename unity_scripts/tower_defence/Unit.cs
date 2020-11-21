using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Unit : MonoBehaviour
{

    public enum GroupType
    {
        Player,
        Enemy
    }
    [SerializeField] GroupType group;

    [SerializeField] bool selected = false; //s
    Vector2 nullPosition = new Vector2(-1111f, -1111f);
    public Vector2 targetPosition;
    Rigidbody2D rb;

    public enum UnitType
    {
        Granch,
        Tatanch,
        Rolench
    }
    [SerializeField] UnitType unitType;

    [SerializeField] Sprite[] unitsprites = new Sprite[3];


    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        targetPosition = nullPosition;

        GameObject manager = GameObject.Find("Manager");
        manager.GetComponent<UnitManager>().AddUnit(gameObject);

        Debug.Log(unitsprites);
        GetComponent<SpriteRenderer>().sprite = unitsprites[(int)unitType];
    }


    void Update()
    {

        if (targetPosition != nullPosition)
        {
            if (isArrive() == false)
            {
                rb.velocity = 1.0f * (targetPosition - (Vector2)transform.position).normalized;
            }
            else
            {
                rb.velocity = Vector2.zero;
            }

        }
    }


    // 敵かどうか調べる
    public bool IsEnemy(Unit targetUnit)
    {
        return group != targetUnit.group;
    }

    bool isArrive()
    {
        float p1 = 2.0f;
        if (targetPosition.x > transform.position.x - transform.lossyScale.x / p1
        && targetPosition.x < transform.position.x + transform.lossyScale.x / p1
        && targetPosition.y > transform.position.y - transform.lossyScale.y / p1
        && targetPosition.y < transform.position.y + transform.lossyScale.y / p1)
        {
            return true;
        }
        return false;
    }

    public void Select()
    {
        selected = true;
        GetComponent<SpriteRenderer>().color = Color.red;
    }
    public void Release()
    {
        selected = false;
        GetComponent<SpriteRenderer>().color = Color.white;
    }


}
